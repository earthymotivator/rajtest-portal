import Link from 'next/link';
import { ArrowRight, BookCopy, CheckCircle2 } from 'lucide-react';
import { examCategories } from '@/lib/mock-data';

export function ExamCategoryPage() {
  return (
    <div className="container-shell py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Exam categories</p>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Choose your target exam</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {examCategories.map((category) => (
          <Link key={category.slug} href={`/exams/${category.slug}`} className="card flex h-full flex-col p-6 hover:border-primary-200 hover:shadow-xl transition">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
