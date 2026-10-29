import Link from 'next/link';
import { ArrowRight, CheckCircle2, CircleDashed, TrendingUp } from 'lucide-react';

export function ResultReviewPage({ examId }: { examId: string }) {
  return (
    <div className="container-shell py-14">
      <div className="mx-auto max-w-5xl card p-8 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Result analysis</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">SSC CGL Full Mock Test</h1>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Pass</div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5"><div className="text-sm text-slate-500">Score</div><div className="mt-2 text-3xl font-black text-slate-900">74%</div></div>
          <div className="rounded-2xl bg-slate-50 p-5"><div className="text-sm text-slate-500">Correct</div><div className="mt-2 text-3xl font-black text-slate-900">74</div></div>
          <div className="rounded-2xl bg-slate-50 p-5"><div className="text-sm text-slate-500">Attempted</div><div className="mt-2 text-3xl font-black text-slate-900">82</div></div>
          <div className="rounded-2xl bg-slate-50 p-5"><div className="text-sm text-slate-500">Rank</div><div className="mt-2 text-3xl font-black text-slate-900">#18</div></div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="text-xl font-bold text-slate-900">Section-wise performance</h3>
            <div className="mt-6 space-y-5">
              {[
                { label: 'Quant', value: 83 },
                { label: 'Reasoning', value: 78 },
                { label: 'English', value: 70 },
                { label: 'GK', value: 65 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm font-medium text-slate-600"><span>{item.label}</span><span>{item.value}%</span></div>
                  <div className="h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-primary-600" style={{ width: `${item.value}%` }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="text-xl font-bold text-slate-900">Answer review</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-700">
              <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Q1 Correct - Average speed calculation</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Q2 Correct - Synonym of Candid</li>
              <li className="flex items-center gap-3"><CircleDashed className="h-4 w-4 text-amber-500" /> Q3 Needs review - Ratio skill improvement</li>
              <li className="flex items-center gap-3"><CircleDashed className="h-4 w-4 text-amber-500" /> Q5 Needs revision - Grammar practice</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <Link href="/dashboard" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700">
            Back to dashboard
          </Link>
          <Link href="/exams" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 font-semibold text-white">
            Take another test <TrendingUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
