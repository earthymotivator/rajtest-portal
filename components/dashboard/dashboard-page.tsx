'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock3, Flag, Save, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getQuestionsForExam } from '@/lib/exam';

const EXAM_ID = 'ssc-cgl-practice';

export function AttemptExamPage({ slug }: { slug: string }) {
  const questions = useMemo(() => getQuestionsForExam(slug || EXAM_ID), [slug]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const [isSaved, setIsSaved] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`rajtest-exam-${slug}`);
    if (saved) {
      setSelectedAnswers(JSON.parse(saved));
    }
  }, [slug]);

  useEffect(() => {
    localStorage.setItem(`rajtest-exam-${slug}`, JSON.stringify(selectedAnswers));
    setIsSaved(true);
    const t = setTimeout(() => setIsSaved(false), 1200);
    return () => clearTimeout(t);
  }, [selectedAnswers, slug]);

  const question = questions[currentIndex];
  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleAutoSubmit = async () => {
    try {
      const res = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: slug,
          studentId: 'stu-1024',
          answers: selectedAnswers,
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        window.location.href = `/results/${slug}`;
      }
    } catch (error) {
      console.error('Auto submit failed', error);
    }
  };

  const handleSubmit = async () => {
    await handleAutoSubmit();
  };

  if (!question) {
    return <div className="container-shell py-12 text-center text-slate-600">No questions found.</div>;
  }

  return (
    <div className="container-shell py-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/exam/${slug}/instructions`} className="rounded-full border border-slate-200 p-2 text-slate-600">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate-500">SSC CGL Mock</div>
            <div className="text-xl font-bold text-slate-900">Question {currentIndex + 1}/{questions.length}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            <Clock3 className="h-4 w-4 text-primary-600" /> {formattedTime}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
            <Save className="h-4 w-4 text-emerald-600" /> {isSaved ? 'Saved' : 'Auto-save'}
          </div>
          <button onClick={handleSubmit} className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white">Submit</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="card p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
              <Flag className="h-4 w-4" /> Question {currentIndex + 1}
            </div>
            <div className="flex gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold text-slate-600">
              <button onClick={() => setLanguage('en')} className={`rounded-full px-2 py-1 ${language === 'en' ? 'bg-white text-slate-900 shadow-sm' : ''}`}>
                EN
              </button>
              <button onClick={() => setLanguage('hi')} className={`rounded-full px-2 py-1 ${language === 'hi' ? 'bg-white text-slate-900 shadow-sm' : ''}`}>
                HI
              </button>
            </div>
          </div>

          <h2 className="text-lg font-semibold leading-8 text-slate-800 md:text-2xl">
            {language === 'en' ? question.text : question.hindiText}
          </h2>

          <div className="mt-8 space-y-4">
            {question.options.map((option, index) => {
              const selected = selectedAnswers[question.id] === index;
              return (
                <button
                  key={option}
                  onClick={() => setSelectedAnswers((prev) => ({ ...prev, [question.id]: index }))}
                  className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${selected ? 'bg-primary-600 text-white' : 'bg-white text-slate-600'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={handlePrev} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={currentIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Question navigator</h3>
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex h-10 items-center justify-center rounded-xl text-sm font-semibold ${index === currentIndex ? 'bg-primary-600 text-white' : selectedAnswers[item.id] !== undefined ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Answered</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{Object.keys(selectedAnswers).length}</div>
            <div className="mt-2 text-xs text-slate-500">of {questions.length} questions</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
