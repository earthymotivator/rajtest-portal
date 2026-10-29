import Link from 'next/link';
import { Activity, ArrowRight, BarChart3, CheckCircle2, Clock3 } from 'lucide-react';
import { dashboardResults } from '@/lib/mock-data';

export function DashboardPage() {
  return (
    <div className="container-shell py-14">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-600">Dashboard</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900">Student performance</h1>
        </div>
        <Link href="/exams" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
          Attempt more tests <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center justify-between text-slate-500"><BarChart3 className="h-5 w-5 text-primary-600" /> <span>Overall score</span></div>
          <div className="mt-5 text-4xl font-black text-slate-900">74%</div>
          <p className="mt-2 text-sm text-slate-600">Across 3 recent attempts</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between text-slate-500"><Activity className="h-5 w-5 text-emerald-600" /> <span>Avg. percentile</span></div>
          <div className="mt-5 text-4xl font-black text-slate-900">87th</div>
          <p className="mt-2 text-sm text-slate-600">Relative to all takers</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between text-slate-500"><Clock3 className="h-5 w-5 text-amber-600" /> <span>Time spent</span></div>
          <div className="mt-5 text-4xl font-black text-slate-900">8.2h</div>
          <p className="mt-2 text-sm text-slate-600">Practice this month</p>
        </div>
      </div>

      <div className="mt-10 card p-6">
        <h2 className="text-2xl font-bold text-slate-900">Recent results</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Exam</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Rank</th>
                <th className="px-4 py-3 font-semibold">Percentile</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {dashboardResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-4 font-medium text-slate-800">{result.title}</td>
                  <td className="px-4 py-4"><span className="font-bold text-slate-900">{result.score}/{result.total}</span></td>
                  <td className="px-4 py-4">#{result.rank}</td>
                  <td className="px-4 py-4">{result.percentile}th</td>
                  <td className="px-4 py-4 text-slate-600">{result.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-bold text-slate-900">Recommended next steps</h3>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Revise arithmetic and ratio based questions</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Practice English vocabulary with timed quizzes</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Take 2 more sectional tests this week</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-bold text-slate-900">Subject-wise details</h3>
          <div className="mt-5 space-y-5">
            {[
              { subject: 'Quant', percent: 81 },
              { subject: 'Reasoning', percent: 76 },
              { subject: 'English', percent: 68 },
              { subject: 'GK', percent: 72 },
            ].map((item) => (
              <div key={item.subject}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.subject}</span>
                  <span className="font-semibold text-slate-900">{item.percent}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-2.5 rounded-full bg-primary-600" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
