import { AttemptExamPage } from '@/components/exam/attempt-exam-page';

export default function Page({ params }: { params: { slug: string } }) {
  return <AttemptExamPage slug={params.slug} />;
}
