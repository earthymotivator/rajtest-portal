"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2, CircleDashed, TrendingUp, Users } from 'lucide-react';
import { adminRecentExams, adminStats, dashboardResults } from '@/lib/mock-data';
import { getExamBySlug, getQuestionsForExam } from '@/lib/exam';

type StoredResult = {
  score?: number;
  correct?: number;
  attempted?: number;
  total?: number;
  status?: string;
  answers?: Record<string, number>;
};

export function ResultReviewPage({ examId }: { examId: string }) {
  const exam = getExamBySlug(examId);
  const questions = getQuestionsForExam(examId);
  const fallback = dashboardResults.find((item) => item.examId === examId);
  const [result, setResult] = useState<StoredResult | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rajtest-result-${examId}`);
      // The result is restored after hydration to keep server and client markup aligned.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(saved ? JSON.parse(saved) as StoredResult : null);
    } catch {
      setResult(null);
    }
  }, [examId]);

  const score = result?.score ?? (fallback ? Math.round((fallback.score / fallback.total) * 100) : 0);
  const correct = result?.correct ?? fallback?.score ?? 0;
  const attempted = result?.attempted ?? fallback?.total ?? 0;

  return (
    <div className="container-shell py-14">
      <div className="mx-auto max-w-5xl card p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary-600">आपका परिणाम</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">{exam?.title || 'टेस्ट परिणाम'}</h1>
          </div>
          <div className={`w-fit rounded-sm px-4 py-2 text-sm font-semibold ${score >= 40 ? 'bg-emerald-50 text-emerald-800' : 'bg-orange-50 text-orange-800'}`}>
            {result?.status === 'fail' || score < 40 ? 'अभ्यास जारी रखें' : 'अच्छा प्रदर्शन'}
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-slate-50 p-4"><div className="text-sm text-slate-500">स्कोर</div><div className="mt-2 text-3xl font-black text-slate-900">{score}%</div></div>
          <div className="bg-slate-50 p-4"><div className="text-sm text-slate-500">सही उत्तर</div><div className="mt-2 text-3xl font-black text-slate-900">{correct}</div></div>
          <div className="bg-slate-50 p-4"><div className="text-sm text-slate-500">हल किए</div><div className="mt-2 text-3xl font-black text-slate-900">{attempted}/{result?.total ?? questions.length}</div></div>
          <div className="bg-slate-50 p-4"><div className="text-sm text-slate-500">कुल प्रश्न</div><div className="mt-2 text-3xl font-black text-slate-900">{result?.total ?? questions.length}</div></div>
        </div>

        <div className="mt-8 border border-slate-200">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold text-slate-900">उत्तर समीक्षा</h2>
            <p className="mt-1 text-sm text-slate-500">सही उत्तर और संक्षिप्त व्याख्या देखें।</p>
          </div>
          <div className="divide-y divide-slate-100">
            {questions.map((question, index) => {
              const selected = result?.answers?.[question.id];
              const isCorrect = selected === question.correctIndex;
              return (
                <article key={question.id} className="p-5">
                  <div className="flex items-start gap-3">
                    {isCorrect ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" /> : <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">{index + 1}. {question.hindiText}</h3>
                      <p className="mt-2 text-sm text-slate-600">आपका उत्तर: {selected === undefined ? 'नहीं दिया' : question.options[selected]}</p>
                      <p className="mt-1 text-sm font-medium text-emerald-800">सही उत्तर: {question.options[question.correctIndex]}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{question.explanation}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <Link href="/dashboard" className="inline-flex min-h-11 items-center justify-center border border-slate-200 bg-white px-5 font-semibold text-slate-700">
            मेरी तैयारी
          </Link>
          <Link href="/exams" className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary-600 px-5 font-semibold text-white">
            अगला टेस्ट चुनें <TrendingUp className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AdminPage() {
  return (
    <div className="container-shell py-10 md:py-14">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--saffron)]">RajTest · संचालन</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[var(--ink)]">Admin overview</h1>
        </div>
        <Link href="/exams" className="inline-flex min-h-10 items-center gap-2 border border-slate-300 bg-white px-4 text-sm font-semibold text-[var(--ink)]">
          Open test catalog <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat, index) => {
          const Icon = index === 1 ? Users : BriefcaseBusiness;
          return (
            <section key={stat.label} className="border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between text-sm text-slate-500"><span>{stat.label}</span><Icon className="h-4 w-4 text-[var(--saffron)]" /></div>
              <p className="mt-4 text-3xl font-extrabold text-[var(--ink)]">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold text-emerald-700">{stat.change} this month</p>
            </section>
          );
        })}
      </div>

      <section className="mt-8 border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div><h2 className="font-bold text-[var(--ink)]">Recent papers</h2><p className="mt-1 text-sm text-slate-500">Latest activity across the test series</p></div>
          <TrendingUp className="h-5 w-5 text-emerald-700" />
        </div>
        <div className="divide-y divide-slate-100">
          {adminRecentExams.map((exam) => (
            <div key={exam.title} className="grid gap-2 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8">
              <p className="font-semibold text-[var(--ink)]">{exam.title}</p>
              <p className="text-sm text-slate-600">{exam.students} attempts</p>
              <p className="text-sm font-semibold text-emerald-700">{exam.completion} completion</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-6 flex justify-end"><Link href="/exams" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--saffron)]">Browse tests <ArrowRight className="h-4 w-4" /></Link></div>
    </div>
  );
}
