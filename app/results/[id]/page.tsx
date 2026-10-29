import { ResultReviewPage } from '@/components/admin/admin-page';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ResultReviewPage examId={id} />;
}
