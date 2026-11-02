import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';

export const metadata: Metadata = {
  title: {
    default: 'RajTest.in — Rajasthan Govt Exam Test Series in Hindi',
    template: '%s | RajTest.in',
  },
  description:
    'Free Hindi mock tests, Rajasthan GK quizzes and previous-year question papers for RPSC, CET, REET, Patwar and Rajasthan Police exams.',
  keywords: ['Rajasthan exam test series', 'RPSC', 'CET', 'REET', 'Patwar', 'Rajasthan GK', 'Hindi mock tests'],
  metadataBase: new URL('https://rajtest.in'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body className="min-h-screen bg-[#f5efe7] text-[var(--ink)] antialiased">
        <div className="min-h-screen bg-[#f5efe7]">
          <Header />
          <main className="pb-24 md:pb-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
