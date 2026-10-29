import Link from 'next/link';
import { ArrowRight, Clock3, Gauge, Star } from 'lucide-react';
import { examCategories, exams } from '@/lib/mock-data';

export function ExamListingPage({ slug }: { slug: string }) {
  const category = examCategories.find((item) => item.slug === slug);
  const filtered = category ? exams.filter((exam) => exam.category.toLowerCase() === category.title.toLowerCase()) : [];
  const title = category?.title ?? 'परीक्षा';

  return (
    <div className="container-shell py-14">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary-600">राजस्थान भर्ती परीक्षा</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{title} के टेस्ट</h1>
        </div>
        <Link href="/exams" className="text-sm font-semibold text-primary-600">← सभी परीक्षाएँ</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.length ? filtered.map((exam) => (
          <div key={exam.id} className="card overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-white text-2xl shadow-sm">{exam.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">{exam.category}</div>
                  <div className="text-xl font-bold text-slate-900">{exam.title}</div>
                </div>
              </div>
              <span className="rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">मुफ़्त</span>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600">{exam.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-sm bg-slate-50 p-3"><Clock3 className="mx-auto h-4 w-4 text-primary-600" /><div className="mt-2 font-bold">{exam.duration} मिनट</div></div>
                <div className="rounded-sm bg-slate-50 p-3"><Gauge className="mx-auto h-4 w-4 text-primary-600" /><div className="mt-2 font-bold">{exam.totalQuestions} प्रश्न</div></div>
                <div className="rounded-sm bg-slate-50 p-3"><Star className="mx-auto h-4 w-4 text-primary-600" /><div className="mt-2 font-bold">{exam.attempts.toLocaleString('hi-IN')} प्रयास</div></div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm font-semibold text-emerald-700">पूरी तरह मुफ़्त</div>
                <Link href={`/exam/${exam.slug}/instructions`} className="inline-flex items-center gap-2 rounded-sm bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
                  टेस्ट शुरू करें <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <div className="card p-8 text-slate-600">इस परीक्षा के टेस्ट जल्द उपलब्ध होंगे।</div>
        )}
      </div>
    </div>
  );
}
