import Link from 'next/link';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, FileText, ShieldCheck } from 'lucide-react';
import { getExamBySlug } from '@/lib/exam';

export function ExamInstructionsPage({ slug }: { slug: string }) {
  const exam = getExamBySlug(slug);

  if (!exam) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">यह टेस्ट उपलब्ध नहीं है।</h1>
        <Link href="/exams" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">सभी टेस्ट देखें <ArrowRight className="h-4 w-4" /></Link>
      </div>
    );
  }

  return (
    <div className="container-shell py-10 md:py-14">
      <div className="mx-auto max-w-4xl border border-slate-200 bg-white p-6 md:p-9">
        <p className="text-sm font-bold text-primary-700">टेस्ट शुरू करने से पहले</p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--ink)] md:text-3xl">{exam.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{exam.description}</p>
          </div>
          <span className="bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">मुफ़्त टेस्ट</span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="bg-slate-50 p-4"><Clock3 className="h-5 w-5 text-primary-700" /><p className="mt-3 font-bold text-[var(--ink)]">{exam.duration} मिनट</p><p className="text-xs text-slate-500">कुल समय</p></div>
          <div className="bg-slate-50 p-4"><FileText className="h-5 w-5 text-primary-700" /><p className="mt-3 font-bold text-[var(--ink)]">{exam.totalQuestions} प्रश्न</p><p className="text-xs text-slate-500">बहुविकल्पीय प्रश्न</p></div>
          <div className="bg-slate-50 p-4"><ShieldCheck className="h-5 w-5 text-primary-700" /><p className="mt-3 font-bold text-[var(--ink)]">तुरंत परिणाम</p><p className="text-xs text-slate-500">उत्तर सहित समीक्षा</p></div>
        </div>

        <section className="mt-8">
          <h2 className="font-bold text-[var(--ink)]">ज़रूरी निर्देश</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />प्रत्येक प्रश्न का एक सही उत्तर चुनें।</li>
            <li className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />प्रश्नों के बीच आने-जाने के लिए प्रश्न सूची का उपयोग करें।</li>
            <li className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />आपके उत्तर इसी डिवाइस पर अपने-आप सेव होते रहेंगे।</li>
            <li className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />समय पूरा होने पर टेस्ट अपने-आप जमा हो जाएगा।</li>
          </ul>
        </section>

        <div className="mt-7 flex gap-3 border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>टेस्ट शुरू करने से पहले सुनिश्चित करें कि आपका इंटरनेट कनेक्शन स्थिर है।</p>
        </div>

        <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row">
          <Link href="/exams" className="inline-flex min-h-11 items-center justify-center border border-slate-300 px-4 text-sm font-semibold text-slate-700">वापस जाएँ</Link>
          <Link href={`/exam/${slug}/attempt`} className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary-600 px-5 text-sm font-bold text-white hover:bg-primary-700">टेस्ट शुरू करें <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}
