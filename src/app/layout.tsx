import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import AudioPlayer from '@/components/AudioPlayer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Taha Hakim Khan — Full-Stack & Systems Engineer | Portfolio',
  description: 'Cyber-noir portfolio of Taha Khan, Full-Stack Engineer and Distributed Systems Architect.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Space+Grotesk:wght@500;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className="min-h-screen bg-[#121316] text-[#F4F5F7] font-sans antialiased selection:bg-[#FFD13B] selection:text-[#121316]"
        suppressHydrationWarning
      >
        {children}
        <AudioPlayer />
        <Analytics />
      </body>
    </html>
  );
}