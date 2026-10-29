import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  MapPinned,
  Trophy,
} from 'lucide-react';
import { examCategories, exams, leaderboardEntries } from '@/lib/mock-data';

export function HomePage() {
  return (
    <div>
      <section className="container-shell pt-6 md:pt-10">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center py-5 md:py-10">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-sm bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-800">
              <MapPinned className="h-4 w-4" />
              राजस्थान सरकारी परीक्षा टेस्ट सीरीज़
            </div>
            <h1 className="max-w-3xl text-[2.6rem] font-extrabold leading-[1.16] text-[var(--ink)] md:text-5xl">
              सरकारी नौकरी की तैयारी,
              <span className="block text-[var(--saffron)]">अब रोज़ाना, बिल्कुल मुफ़्त।</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              RPSC, CET, REET, Patwar और Rajasthan Police के लिए हिंदी में PYQ, daily quizzes और exam-जैसे mock tests.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/exam/rajtest-pyq-12/instructions" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--saffron)] px-5 text-sm font-bold text-white transition hover:bg-[var(--saffron-dark)]">
                मुफ़्त टेस्ट शुरू करें <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/exams" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--ink)]">
                सभी टेस्ट देखें <ArrowDownRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-5 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> बिना फीस</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> हिंदी में प्रश्न</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-700" /> तुरंत रिज़ल्ट</span>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-sm bg-[var(--ink)] md:min-h-[420px]">
            <Image
              src="https://rajtest.in/og-image.jpg"
              alt="Rajtest.in Rajasthan government exam test series"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-20 text-white md:p-7 md:pt-28">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-orange-200"><Flame className="h-4 w-4" /> आज का लोकप्रिय पेपर</p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">RajTest PYQ #12</h2>
                <p className="mt-1 text-sm text-white/80">10 प्रश्न · राजस्थान सामान्य ज्ञान</p>
              </div>
              <Link href="/exam/rajtest-pyq-12/instructions" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--ink)] transition hover:bg-orange-100" aria-label="आज का टेस्ट शुरू करें">
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { value: '411', label: 'प्रैक्टिस पेपर', icon: BookOpenCheck },
            { value: '30,470', label: 'टेस्ट प्रयास', icon: GraduationCap },
            { value: '1,888', label: 'तैयारी कर रहे छात्र', icon: Trophy },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-4 md:px-7">
              <Icon className="h-5 w-5 text-[var(--saffron)]" />
              <div><p className="text-xl font-extrabold text-[var(--ink)]">{value}</p><p className="text-xs text-slate-500">{label}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell py-12 md:py-16" id="today-tests">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-[var(--saffron)]">रोज़ नए पेपर</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[var(--ink)] md:text-3xl">आज के टेस्ट</h2>
          </div>
          <Link href="/exams" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:text-[var(--saffron)]">
            सभी टेस्ट <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {exams.slice(0, 3).map((exam, index) => (
            <article key={exam.id} className="border border-slate-200 bg-white p-4 transition hover:border-orange-300">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-orange-50 text-xl">{exam.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{index === 0 ? 'नया पेपर' : exam.category}</p>
                    <h3 className="mt-1 text-base font-bold text-[var(--ink)]">{exam.title}</h3>
                  </div>
                </div>
                <span className="shrink-0 rounded-sm bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800">मुफ़्त</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {exam.duration} मिनट</span>
                <span>{exam.totalQuestions} प्रश्न</span>
                <Link href={`/exam/${exam.slug}/instructions`} className="inline-flex items-center gap-1 font-bold text-[var(--saffron)] hover:text-[var(--saffron-dark)]">शुरू करें <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12 md:py-16">
        <div className="container-shell">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[var(--saffron)]">अपनी परीक्षा चुनें</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--ink)] md:text-3xl">परीक्षा के अनुसार तैयारी</h2>
            </div>
            <Link href="/exams" className="hidden items-center gap-1 text-sm font-semibold text-[var(--ink)] sm:inline-flex">सभी परीक्षाएँ <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {examCategories.map((category) => (
              <Link key={category.slug} href={`/exams/${category.slug}`} className="group border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50/40">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-100 text-xl group-hover:bg-white">{category.icon}</span>
                <h3 className="mt-4 font-bold text-[var(--ink)]">{category.title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 md:grid-cols-[0.8fr_1.2fr] md:py-16" id="leaderboard">
        <div className="flex flex-col justify-between bg-[var(--ink)] p-6 text-white md:p-8">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-orange-200"><Trophy className="h-4 w-4" /> इस सप्ताह</p>
            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">लीडरबोर्ड</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">हर टेस्ट के बाद अपनी तैयारी और रैंक देखें। लगातार अभ्यास करें और आगे बढ़ें।</p>
          </div>
          <Link href="/leaderboard" className="mt-6 inline-flex w-fit items-center gap-2 border-b border-orange-300 pb-1 text-sm font-semibold text-orange-200 hover:text-white">पूरी रैंकिंग देखें <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="divide-y divide-slate-200 border border-slate-200 bg-white">
          {leaderboardEntries.map((leader) => (
            <div key={leader.rank} className="flex items-center gap-4 px-4 py-3 md:px-5">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${leader.color}`}>{leader.rank}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[var(--ink)]">{leader.name}</span>
              <span className="text-sm font-extrabold text-[var(--ink)]">{leader.score}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-orange-50/60 py-10">
        <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold text-[var(--saffron)]">आज से शुरुआत करें</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[var(--ink)]">अगला टेस्ट आपका इंतज़ार कर रहा है।</h2>
          </div>
          <Link href="/exams" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--ink)] px-5 text-sm font-bold text-white hover:bg-emerald-950">
            टेस्ट चुनें <CalendarDays className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
