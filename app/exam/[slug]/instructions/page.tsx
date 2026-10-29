import { ExamInstructionsPage } from '@/components/exam/exam-instructions-page';

export default function Page({ params }: { params: { slug: string } }) {
  return <ExamInstructionsPage slug={params.slug} />;
}
