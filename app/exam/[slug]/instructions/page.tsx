import { ExamInstructionsPage } from '@/components/exam/attempt-exam-page';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExamInstructionsPage slug={slug} />;
}
