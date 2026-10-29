import { ResultReviewPage } from '@/components/results/result-review-page';

export default function Page({ params }: { params: { id: string } }) {
  return <ResultReviewPage examId={params.id} />;
}
