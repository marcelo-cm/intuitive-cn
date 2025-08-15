import { LogSnagProvider } from '@logsnag/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  metadataBase: new URL('https://www.marcelochaman.ca'),
  title: 'Marcelo, Software & Design',
  description: 'Moving Pixels',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === 'development' && (
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      )}
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
