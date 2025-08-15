import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
async function loadGoogleFont() {
  const url = `https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:opsz,wght@14..32,100..900`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );
  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }
  throw new Error('failed to load font data');
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const title = searchParams.get('title');
    const date = searchParams.get('date');

    const averageCharacterWidth = 50; // Approximation for Inter font size 40px
    const availableWidth = 1550; // Total width minus padding

    const willOverflow =
      title && title.length * averageCharacterWidth > availableWidth;

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: '4.75rem',
            color: 'white',
            display: 'flex',
            background: '#F5F5F5',
            width: '100%',
            height: '100%',
            position: 'relative',
            padding: '72px',
            textAlign: 'left',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            fontWeight: '500',
            fontFamily: 'Geist',
          }}
        >
          <p
            style={{
              position: 'absolute',
              top: '72px',
              left: '72px',
              fontSize: '3rem',
              color: '#80838D',
              margin: '0 0 0 0',
            }}
          >
            {date}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: willOverflow ? 'column' : 'row',
              gap: '0',
              color: '#80838D',
              margin: '0 0 0 0',
            }}
          >
            <p
              style={{
                margin: '0 0 0 0',
                color: '#000000',
              }}
            >
              Simplexity
            </p>
            <p style={{ margin: '0 0 0 0' }}>
              {!willOverflow && '—'}
              {title}
            </p>
          </div>
        </div>
      ),
      {
        width: 2160,
        height: 1080,
        fonts: [
          {
            name: 'Geist',
            data: await loadGoogleFont(),
            style: 'normal',
            weight: 500,
          },
        ],
      },
    );
  } catch (e) {
    console.log(e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
