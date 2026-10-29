import Link from 'next/link';
import { ArrowRight, BookCopy, CheckCircle2 } from 'lucide-react';
import { examCategories, exams } from '@/lib/mock-data';

export function ExamCategoryPage() {
  return (
    <div className="container-shell py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary-600">राजस्थान भर्ती परीक्षाएँ</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">अपनी परीक्षा चुनें</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {examCategories.map((category) => {
          const count = exams.filter((exam) => exam.category.toLowerCase() === category.title.toLowerCase()).length;
          return (
          <Link key={category.slug} href={`/exams/${category.slug}`} className="card flex h-full flex-col p-5 transition hover:border-primary-300">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary-50 text-2xl">{category.icon}</div>
              <span className="text-xs font-semibold text-slate-500">{count} टेस्ट</span>
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">{category.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> सभी अभ्यास सेट मुफ़्त</div>
              <div className="flex items-center gap-2"><BookCopy className="h-4 w-4 text-emerald-600" /> उत्तर और व्याख्या सहित</div>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary-600">
              <span>टेस्ट देखें</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
