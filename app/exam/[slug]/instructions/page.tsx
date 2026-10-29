import { ExamListingPage } from '@/components/exams/exam-listing-page';

export default function Page({ params }: { params: { slug: string } }) {
  return <ExamListingPage slug={params.slug} />;
}
