import Link from 'next/link';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, FileText, ShieldCheck } from 'lucide-react';
import { getExamBySlug } from '@/lib/exam';

export function ExamInstructionsPage({ slug }: { slug: string }) {
  const exam = getExamBySlug(slug) || { title: 'Exam', duration: 120, totalQuestions: 100, highlights: ['Mock prep', 'Auto-save'] };

  return (
    <div className="container-shell py-14">
      <div className="mx-auto max-w-4xl card p-8 md:p-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Instructions</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">{exam.title}</h1>
          </div>
          <div className="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">{exam.totalQuestions} Questions</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4"><Clock3 className="h-5 w-5 text-primary-600" /><div className="mt-3 text-lg font-bold">{exam.duration} mins</div><div className="text-sm text-slate-600">Total duration</div></div>
          <div className="rounded-2xl bg-slate-50 p-4"><FileText className="h-5 w-5 text-primary-600" /><div className="mt-3 text-lg font-bold">1 Mark each</div><div className="text-sm text-slate-600">Question pattern</div></div>
          <div className="rounded-2xl bg-slate-50 p-4"><ShieldCheck className="h-5 w-5 text-primary-600" /><div className="mt-3 text-lg font-bold">Auto submit</div><div className="text-sm text-slate-600">At timeout</div></div>
        </div>

        <div className="mt-10 space-y-4 text-slate-700">
          <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /><span>Read each question carefully before choosing the best option.</span></div>
          <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /><span>Questions can be skipped and revisited using the navigation panel.</span></div>
          <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /><span>Your progress is saved automatically every few seconds.</span></div>
          <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" /><span>On timeout, the exam is submitted automatically and scored on server.</span></div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <div className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" /> Important</div>
          <p className="mt-2">Once you begin, you cannot refresh or reopen the exam. Ensure uninterrupted internet access.</p>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 sm:flex-row">
          <Link href="/exams" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700">
            Go back
          </Link>
          <Link href={`/exam/${slug}/attempt`} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 font-semibold text-white">
            Start exam <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
