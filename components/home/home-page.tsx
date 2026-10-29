import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BookText,
  BriefcaseBusiness,
  Clock3,
  GraduationCap,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { examCategories, exams } from '@/lib/mock-data';

const updates = [
  'SSC CGL 2026 registration open',
  'Railway NTPC mock test live',
  'Bank PO interview guidance released',
  'New bilingual question packs available',
];

const services = [
  { title: 'Online Test Series', icon: BookOpen },
  { title: 'Previous Papers', icon: LayoutGrid },
  { title: 'Answer Keys', icon: BadgeCheck },
  { title: 'Admit Cards', icon: BriefcaseBusiness },
  { title: 'Syllabus', icon: BookText },
  { title: 'Cut Offs', icon: TrendingUp },
];

export function HomePage() {
  return (
    <div>
      <section className="container-shell pb-8 pt-10 md:pb-12 md:pt-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft md:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.18fr_0.82fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-700">
                <Sparkles className="h-3.5 w-3.5" />
                Smart exam prep platform
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 md:text-6xl">
                Your gateway to <span className="text-primary-600">success</span> in competitive exams.
              </h1>

              <p className="mt-5 max-w-xl text-base text-slate-600 md:text-lg">
                Prepare with real exam-style mock tests, instant analysis, and chapter-wise practice for SSC, Banking, Railway, and State exams.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/exams"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700"
                >
                  Explore exams <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-200 hover:text-primary-600"
                >
                  Student dashboard
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div>
                  <span className="block text-2xl font-black text-slate-900">2.4L+</span>
                  Students prepared
                </div>
                <div>
                  <span className="block text-2xl font-black text-slate-900">89%</span>
                  Success rate
                </div>
                <div>
                  <span className="block text-2xl font-black text-slate-900">2000+</span>
                  Mock tests
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-900 p-5 text-white shadow-soft">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Live exam</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">Active</span>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Exam</div>
                  <div className="mt-2 text-3xl font-extrabold">SSC CGL</div>
                </div>
                <div className="rounded-2xl bg-primary-500/20 px-3 py-2 text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Time left</div>
                  <div className="mt-1 text-xl font-bold">01:24:55</div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { label: 'Quant', value: 70 },
                  { label: 'Reasoning', value: 82 },
                  { label: 'English', value: 68 },
                  { label: 'GK', value: 74 },
                ].map((subject) => (
                  <div key={subject.label} className="flex items-center justify-between gap-3 text-sm text-slate-200">
                    <span>{subject.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-20 overflow-hidden rounded-full bg-slate-700">
                        <div className="h-full rounded-full bg-primary-400" style={{ width: `${subject.value}%` }} />
                      </div>
                      <span>{subject.value}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-primary-500/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-primary-200"><BookOpen className="h-4 w-4" /> Practice</div>
                  <div className="mt-3 text-2xl font-black">1200+</div>
                  <div className="text-xs text-slate-300">Questions</div>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-2 text-sm text-emerald-200"><Clock3 className="h-4 w-4" /> Timed</div>
                  <div className="mt-3 text-2xl font-black">80+</div>
                  <div className="text-xs text-slate-300">Mock tests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-3">
        <div className="container-shell flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Latest updates:</span>
          {updates.map((update) => (
            <span key={update} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
              {update}
            </span>
          ))}
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Popular exams</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Choose your category</h2>
          </div>
          <Link href="/exams" className="hidden text-sm font-semibold text-primary-600 md:inline-flex">
            View all categories →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {examCategories.map((category) => (
            <Link key={category.slug} href={`/exams/${category.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-3xl shadow-sm">{category.icon}</div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  120+ tests
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary-600">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-14 text-white">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-200">Why choose us</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Everything to prepare smarter</h2>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: LayoutGrid, title: 'Curated mock tests', text: 'Exam-specific practice mapped to real patterns.' },
              { icon: ShieldCheck, title: 'Instant review', text: 'Understand mistakes with smart explanations.' },
              { icon: TrendingUp, title: 'Progress tracking', text: 'Stay ahead with analytics and percentile insights.' },
              { icon: GraduationCap, title: 'Focused learning', text: 'Strengthen weak sections with guided revision.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-slate-800 bg-slate-800/60 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Quick links</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Study smarter with essential tools</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map(({ title, icon: Icon }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">Focused resources built for complete exam preparation.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Featured tests</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Trending mock exams</h2>
          </div>
          <Link href="/exams" className="hidden text-sm font-semibold text-primary-600 md:inline-flex">
            View all tests →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {exams.map((exam) => (
            <div key={exam.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">{exam.icon}</div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{exam.category}</div>
                    <div className="text-lg font-bold text-slate-900">{exam.title}</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  {exam.status}
                </span>
              </div>

              <div className="p-5">
                <p className="text-sm leading-6 text-slate-600">{exam.description}</p>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="text-lg font-black text-slate-900">{exam.totalQuestions}</div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Qns</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="text-lg font-black text-slate-900">{exam.duration}</div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">mins</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="text-lg font-black text-slate-900">{exam.level}</div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Level</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="text-base font-bold text-slate-900">₹{exam.price}</div>
                  <Link href={`/exam/${exam.slug}/instructions`} className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary-600/15">
                    Start now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container-shell">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Success stories</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Aspirants who cracked it</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: 'Riya Sharma', exam: 'SSC CGL', quote: 'The mock tests felt just like the actual exam. My speed and precision improved a lot.' },
              { name: 'Amit Verma', exam: 'Bank PO', quote: 'The analytical breakdown after each test helped me identify my weak concepts fast.' },
              { name: 'Nisha Gupta', exam: 'Railway', quote: 'The bilingual questions and review pages made revision easy and effective.' },
            ].map((story) => (
              <div key={story.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-700">“{story.quote}”</p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="font-bold text-slate-900">{story.name}</div>
                  <div className="text-sm text-slate-500">{story.exam}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
