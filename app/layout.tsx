import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'RajTest.in | Competitive Exam Prep',
    template: '%s | RajTest.in',
  },
  description:
    'Online mock tests, exam analysis, and study resources for SSC, Banking, Railway, and other competitive exams.',
  keywords: ['competitive exams', 'SSC', 'banking', 'railway', 'mock tests'],
  metadataBase: new URL('https://rajtest.in'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-slate-50 text-slate-900 antialiased')}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(76,105,240,0.10),_transparent_30%)]">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
