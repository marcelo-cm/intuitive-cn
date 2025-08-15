import { ipAddress } from '@vercel/functions';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

const VIEW_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Hashes an IP address for privacy.
 * @param {string} ip - The IP address to hash.
 * @returns {string} - The hashed IP address.
 */
function hashIp(ip: string) {
  return crypto.createHash('sha256').update(ip).digest('hex');
}

/**
 * Filters and returns valid IP entries that are within the timeout window.
 * @param {Array<{ ip: string, timestamp: number }>} ipEntries - List of IP entries with timestamps.
 * @param {number} now - The current timestamp.
 * @returns {Array<{ ip: string, timestamp: number }>} - Filtered list of valid IP entries.
 */
function getValidIps(
  ipEntries: Array<{ ip: string; timestamp: number }>,
  now: number,
) {
  return ipEntries.filter((entry) => now - entry.timestamp < VIEW_TIMEOUT_MS);
}

/**
 * Checks if a hashed IP already exists in the valid IP entries.
 * @param {Array<{ ip: string, timestamp: number }>} validIps - List of valid IP entries.
 * @param {string} hashedIp - The hashed IP to check.
 * @returns {boolean} - Whether the hashed IP exists in the valid IP list.
 */
function isIpRecorded(
  validIps: Array<{ ip: string; timestamp: number }>,
  hashedIp: string,
) {
  return validIps.some((entry) => entry.ip === hashedIp);
}

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;
  const { slug } = params;
  const ip = ipAddress(req) || req.headers.get('x-forwarded-for') || 'unknown';
  const hashedIp = hashIp(ip);

  const supabase = await createClient();

  const { data: viewRecord, error: fetchError } = await supabase
    .from('views')
    .select('views, last_viewed_ips')
    .eq('slug', slug)
    .maybeSingle();

  if (fetchError) {
    console.error('Error fetching view record:', fetchError);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }

  const now = Date.now();

  if (viewRecord) {
    const { views, last_viewed_ips: ipEntries = [] } = viewRecord;
    const validIps = getValidIps(ipEntries, now);

    if (!isIpRecorded(validIps, hashedIp)) {
      validIps.push({ ip: hashedIp, timestamp: now });

      const { error: updateError } = await supabase
        .from('views')
        .update({ views: views + 1, last_viewed_ips: validIps })
        .eq('slug', slug);

      if (updateError) {
        console.error('Error updating view record:', updateError);
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ views });
  }

  // Insert new record if it doesn't exist
  const { error: insertError } = await supabase.from('views').insert({
    slug,
    views: 1,
    last_viewed_ips: [{ ip: hashedIp, timestamp: now }],
  });

  if (insertError) {
    console.error('Error inserting new view record:', insertError);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }

  return NextResponse.json({ views: 1 });
}
