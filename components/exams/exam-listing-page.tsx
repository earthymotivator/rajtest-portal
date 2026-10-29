import Link from 'next/link';
import { ArrowRight, BookCopy, CheckCircle2 } from 'lucide-react';
import { examCategories } from '@/lib/mock-data';

export function ExamListingPage({ slug }: { slug: string }) {
  const filtered = examCategories.filter((category) =>
    category.slug.toLowerCase() === slug.toLowerCase() || category.title.toLowerCase().includes(slug.toLowerCase())
  );
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.length ? filtered.map((category) => (
          <div key={category.slug} className="card flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl">{category.icon}</div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Live</span>
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">{category.title}</h2>
            <p className="mt-3 text-sm text-slate-600">{category.description}</p>
            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 120+ curated tests</div>
              <div className="flex items-center gap-2"><BookCopy className="h-4 w-4 text-emerald-500" /> Detailed solutions</div>
            </div>
            <div className="mt-8 flex items-center justify-between text-sm font-semibold text-primary-600">
              <span>View tests</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        )) : (
          <div className="card p-8 text-slate-600">No tests are currently available in this category.</div>
        )}
      </div>
    </div>
  );
}
