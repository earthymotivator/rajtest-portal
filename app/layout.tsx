import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'RajTest Portal | Competitive Exam Preparation',
    template: '%s | RajTest Portal',
  },
  description:
    'Prepare for competitive exams with mock tests, results, analysis, and live exam experience.',
  keywords: ['competitive exams', 'test series', 'mock tests', 'SSC', 'Railway', 'Banking'],
  openGraph: {
    title: 'RajTest Portal',
    description: 'Competitive exam portal for preparation, analysis, and performance tracking.',
    type: 'website',
  },
  metadataBase: new URL('https://rajtest.in'),
};
