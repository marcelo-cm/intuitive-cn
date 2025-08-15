import { LogSnagProvider } from '@logsnag/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import Navigation from './_components/navigation';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'the repository',
  description:
    'patterns, code snippets, and basic practices for design engineering.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Script
        crossOrigin="anonymous"
        src="//unpkg.com/react-scan/dist/auto.global.js"
      />
      <LogSnagProvider
        token={process.env.NEXT_PUBLIC_LOG_SNAG_API_TOKEN!}
        project="the-repository"
      >
        <TooltipProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} min-h-svh font-sans antialiased`}
          >
            <Analytics />
            {children}
            <Navigation />
            <Toaster />
          </body>
        </TooltipProvider>
      </LogSnagProvider>
    </html>
  );
}
