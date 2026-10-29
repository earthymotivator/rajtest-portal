'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock3, Flag, Save, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getExamBySlug, getQuestionsForExam } from '@/lib/exam';

const DEFAULT_EXAM_ID = 'rajtest-pyq-12';

async function submitExam(slug: string, answers: Record<string, number>, navigate: (path: string) => void) {
  const response = await fetch('/api/submit-exam', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      examId: slug,
      studentId: 'guest-student',
      answers,
      submittedAt: new Date().toISOString(),
    }),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.error || 'टेस्ट जमा नहीं हो पाया।');
  localStorage.setItem(`rajtest-result-${slug}`, JSON.stringify({ ...result, answers }));
  navigate(`/results/${slug}`);
}

export function AttemptExamPage({ slug }: { slug: string }) {
  const router = useRouter();
  const examSlug = slug || DEFAULT_EXAM_ID;
  const exam = getExamBySlug(examSlug);
  const questions = useMemo(() => getQuestionsForExam(examSlug), [examSlug]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState((exam?.duration ?? 15) * 60);
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const answersRef = useRef(selectedAnswers);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rajtest-exam-${examSlug}`);
      const restoredAnswers = saved ? JSON.parse(saved) as Record<string, number> : {};
      answersRef.current = restoredAnswers;
      // Local storage is read after hydration to keep server and client markup aligned.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedAnswers(restoredAnswers);
    } catch {
      answersRef.current = {};
      setSelectedAnswers({});
    }
  }, [examSlug]);

  useEffect(() => {
    answersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    const nextAnswers = { ...answersRef.current, [questionId]: answerIndex };
    answersRef.current = nextAnswers;
    setSelectedAnswers(nextAnswers);
    try {
      localStorage.setItem(`rajtest-exam-${examSlug}`, JSON.stringify(nextAnswers));
    } catch {
      setSubmitError('उत्तर सेव नहीं हो पाया।');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          void submitExam(examSlug, answersRef.current, router.push).catch((error: unknown) => console.error(error));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examSlug, router.push]);

  const question = questions[currentIndex];
  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitExam(examSlug, answersRef.current, router.push);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'टेस्ट जमा नहीं हो पाया।');
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return <div className="container-shell py-12 text-center text-slate-600">इस टेस्ट के प्रश्न उपलब्ध नहीं हैं।</div>;
  }

  return (
    <div className="container-shell py-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/exam/${examSlug}/instructions`} className="rounded-sm border border-slate-200 p-2 text-slate-600" aria-label="निर्देशों पर वापस जाएँ">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-sm text-slate-500">{exam?.title || 'राजस्थान सामान्य ज्ञान टेस्ट'}</div>
            <div className="text-xl font-bold text-slate-900">प्रश्न {currentIndex + 1}/{questions.length}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-sm bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            <Clock3 className="h-4 w-4 text-primary-600" /> {formattedTime}
          </div>
          <div className="hidden items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 sm:flex">
            <Save className="h-4 w-4 text-emerald-600" /> ऑटो-सेव
          </div>
          <button onClick={handleSubmit} disabled={isSubmitting} className="rounded-sm bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{isSubmitting ? 'जमा हो रहा है…' : 'टेस्ट जमा करें'}</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="card p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary-600">
              <Flag className="h-4 w-4" /> प्रश्न {currentIndex + 1}
            </div>
            <div className="flex gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold text-slate-600">
              <button onClick={() => setLanguage('en')} className={`rounded-sm px-2 py-1 ${language === 'en' ? 'bg-white text-slate-900 shadow-sm' : ''}`}>
                EN
              </button>
              <button onClick={() => setLanguage('hi')} className={`rounded-sm px-2 py-1 ${language === 'hi' ? 'bg-white text-slate-900 shadow-sm' : ''}`}>
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
                  onClick={() => handleAnswer(question.id, index)}
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
            <button onClick={handlePrev} className="rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50" disabled={currentIndex === 0}>
              पिछला
            </button>
            <button onClick={handleNext} className="inline-flex items-center gap-2 rounded-sm bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
              अगला <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {submitError && <p className="mt-4 text-sm font-medium text-red-700" role="alert">{submitError}</p>}
        </div>

        <aside className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">प्रश्न सूची</h3>
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
            <div className="text-sm text-slate-500">हल किए</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{Object.keys(selectedAnswers).length}</div>
            <div className="mt-2 text-xs text-slate-500">कुल {questions.length} प्रश्न</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
