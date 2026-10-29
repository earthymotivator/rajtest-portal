import { AttemptExamPage } from '@/components/dashboard/dashboard-page';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AttemptExamPage key={slug} slug={slug} />;
}
