import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { MascotWidget } from '@/components/MascotWidget';

export const metadata: Metadata = {
  title: 'Articlarity Learn — Duolingo DSA & Official GATE CS 2027',
  description: 'Motion-first technical learning platform combining Duolingo-style micro-learning, LeetCode Python mastery, and exam-faithful GATE CS 2027 preparation.',
  keywords: ['DSA', 'LeetCode', 'Python', 'GATE CS 2027', 'IIT Madras', 'Compiler', 'Heatmap', 'Algorithms'],
  authors: [{ name: 'Harshith' }],
  metadataBase: new URL('https://learn.articlarity.com'),
  openGraph: {
    title: 'Articlarity Learn — Master Python DSA & GATE CS 2027',
    description: 'Zero-login compiler, 365-day heatmaps, automated GitHub commits, and 18 interactive pattern simulators.',
    url: 'https://learn.articlarity.com',
    siteName: 'Articlarity Learn',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="default">
      <body>
        <Suspense fallback={<div style={{ height: '60px', background: 'rgba(7, 10, 19, 0.85)' }} />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
        <MascotWidget />
      </body>
    </html>
  );
}
