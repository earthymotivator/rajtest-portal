import Link from 'next/link';
import { ArrowRight, Clock3, Gauge, Star } from 'lucide-react';
import { exams } from '@/lib/mock-data';

export function ExamListingPage({ slug }: { slug: string }) {
  const filtered = exams.filter((exam) => exam.category.toLowerCase() === slug.toLowerCase() || exam.slug.includes(slug));
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="container-shell py-14">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">{title}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Available tests</h1>
        </div>
        <Link href="/exams" className="text-sm font-semibold text-primary-600">← Back to categories</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.length ? filtered.map((exam) => (
          <div key={exam.id} className="card overflow-hidden">
            <div className="flex items-center justify-between bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{exam.icon}</div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{exam.category}</div>
                  <div className="text-xl font-bold text-slate-900">{exam.title}</div>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{exam.status}</span>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-600">{exam.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-xl bg-slate-50 p-3"><Clock3 className="mx-auto h-4 w-4 text-primary-600" /><div className="mt-2 font-bold">{exam.duration}m</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><Gauge className="mx-auto h-4 w-4 text-primary-600" /><div className="mt-2 font-bold">{exam.difficulty}</div></div>
                <div className="rounded-xl bg-slate-50 p-3"><Star className="mx-auto h-4 w-4 text-primary-600" /><div className="mt-2 font-bold">{exam.attempts}</div></div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-500">₹{exam.price}</div>
                <Link href={`/exam/${exam.slug}/instructions`} className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
                  Start test <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <div className="card p-8 text-slate-600">No tests are currently available in this category.</div>
        )}
      </div>
    </div>
  );
}
