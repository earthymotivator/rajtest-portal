import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, LayoutGrid, ShieldCheck, Sparkles, TimerReset } from 'lucide-react';
import { examCategories, exams } from '@/lib/mock-data';

export function HomePage() {
  return (
    <div>
      <section className="container-shell pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <span className="pill mb-5 bg-primary-50 text-primary-700 ring-1 ring-primary-100">
              <Sparkles className="h-3.5 w-3.5" />
              Smart exam prep platform
            </span>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Your path to <span className="text-primary-600">exam success</span> starts here.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Practice with live mock tests, real-time analytics, detailed review, and curriculum-based preparation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/exams"
                className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20"
              >
                Explore Exams <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
              >
                Student Dashboard
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <div><span className="block text-2xl font-bold text-slate-900">2.4L+</span> students prepared</div>
              <div><span className="block text-2xl font-bold text-slate-900">89%</span> success rate</div>
              <div><span className="block text-2xl font-bold text-slate-900">2000+</span> test series</div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="rounded-[1.5rem] bg-slate-900 p-5 text-white">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Live Exam</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300">● Active</span>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Test</div>
                  <div className="mt-2 text-2xl font-bold">SSC CGL</div>
                </div>
                <div className="rounded-2xl bg-primary-500/20 px-3 py-2 text-right">
                  <div className="text-xs text-slate-300">Time Left</div>
                  <div className="text-lg font-bold text-white">01:24:55</div>
                </div>
              </div>
              <div className="mt-8 space-y-3">
                {['Quant', 'Reasoning', 'English', 'GK'].map((subject, index) => (
                  <div key={subject} className="flex items-center justify-between text-sm text-slate-200">
                    <span>{subject}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-700">
                        <div className="h-full rounded-full bg-primary-400" style={{ width: `${60 + index * 10}%` }} />
                      </div>
                      <span>{60 + index * 10}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-primary-50 p-4">
                <div className="flex items-center gap-2 text-primary-700"><BookOpen className="h-4 w-4" /> Practice</div>
                <div className="mt-3 text-2xl font-bold text-slate-900">1,200+</div>
                <div className="text-sm text-slate-500">Questions</div>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-emerald-700"><TimerReset className="h-4 w-4" /> Timed</div>
                <div className="mt-3 text-2xl font-bold text-slate-900">80+</div>
                <div className="text-sm text-slate-500">Mock tests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Top categories</p>
            <h2 className="section-title mt-2">Explore exam categories</h2>
          </div>
          <Link href="/exams" className="hidden text-sm font-semibold text-primary-600 md:inline-flex">
            View all categories →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {examCategories.map((category) => (
            <Link key={category.slug} href={`/exams/${category.slug}`} className="card group p-6 transition hover:-translate-y-1 hover:border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-2xl">{category.icon}</div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  120+ Tests
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{category.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm font-medium text-primary-600">
                <span>Explore</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-14 text-white">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-4"> 
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-200">Why aspirants choose us</p>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">Everything needed to perform better</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: LayoutGrid, title: 'Curated mock tests', text: 'Exam-style tests mapped to real syllabi.' },
              { icon: Goal, title: 'Instant review', text: 'Get solution explanations and detailed insights.' },
              { icon: ShieldCheck, title: 'Performance tracking', text: 'Monitor growth with percentile analytics.' },
              { icon: GraduationCap, title: 'Focused learning', text: 'Strengthen concepts and fill knowledge gaps.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/15 text-primary-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Popular tests</p>
            <h2 className="section-title mt-2">Trending mock exams</h2>
          </div>
          <Link href="/exams" className="hidden text-sm font-semibold text-primary-600 md:inline-flex">
            View all tests →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {exams.map((exam) => (
            <div key={exam.id} className="card overflow-hidden">
              <div className="flex items-center justify-between bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{exam.icon}</div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{exam.category}</div>
                    <div className="text-lg font-bold text-slate-900">{exam.title}</div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{exam.status}</span>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600">{exam.description}</p>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-lg font-bold text-slate-900">{exam.totalQuestions}</div>
                    <div className="text-xs text-slate-500">Qns</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-lg font-bold text-slate-900">{exam.duration}</div>
                    <div className="text-xs text-slate-500">mins</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-lg font-bold text-slate-900">{exam.level}</div>
                    <div className="text-xs text-slate-500">Level</div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-500">₹{exam.price}</div>
                  <Link href={`/exam/${exam.slug}/instructions`} className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
                    Start now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Goal(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" /></svg>;
}
