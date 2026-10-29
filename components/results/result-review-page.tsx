import Link from 'next/link';
import { Activity, ArrowRight, BarChart3, CheckCircle2, Clock3 } from 'lucide-react';
import { dashboardResults } from '@/lib/mock-data';

export function DashboardPage() {
  const averageScore = Math.round(dashboardResults.reduce((sum, result) => sum + (result.score / result.total) * 100, 0) / dashboardResults.length);
  const averagePercentile = Math.round(dashboardResults.reduce((sum, result) => sum + result.percentile, 0) / dashboardResults.length);

  return (
    <div className="container-shell py-14">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-600">RajTest · आपकी तैयारी</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">मेरी तैयारी</h1>
        </div>
        <Link href="/exams" className="inline-flex min-h-11 items-center gap-2 bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
          नया टेस्ट दें <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center justify-between text-slate-500"><BarChart3 className="h-5 w-5 text-primary-600" /> <span>औसत स्कोर</span></div>
          <div className="mt-5 text-4xl font-black text-slate-900">{averageScore}%</div>
          <p className="mt-2 text-sm text-slate-600">हाल के {dashboardResults.length} अभ्यास टेस्ट</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between text-slate-500"><Activity className="h-5 w-5 text-emerald-600" /> <span>औसत परसेंटाइल</span></div>
          <div className="mt-5 text-4xl font-black text-slate-900">{averagePercentile}वाँ</div>
          <p className="mt-2 text-sm text-slate-600">सभी प्रयासों के आधार पर</p>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between text-slate-500"><Clock3 className="h-5 w-5 text-amber-600" /> <span>कुल टेस्ट</span></div>
          <div className="mt-5 text-4xl font-black text-slate-900">{dashboardResults.length}</div>
          <p className="mt-2 text-sm text-slate-600">रिकॉर्ड में उपलब्ध प्रयास</p>
        </div>
      </div>

      <div className="mt-10 card p-6">
        <h2 className="text-xl font-bold text-slate-900">हाल के परिणाम</h2>
        <div className="mt-5 overflow-x-auto border border-slate-200">
          <table className="min-w-[680px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">टेस्ट</th>
                <th className="px-4 py-3 font-semibold">स्कोर</th>
                <th className="px-4 py-3 font-semibold">रैंक</th>
                <th className="px-4 py-3 font-semibold">परसेंटाइल</th>
                <th className="px-4 py-3 font-semibold">तारीख</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {dashboardResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-4 font-medium text-slate-800"><Link href={`/results/${result.examId}`} className="hover:text-primary-700">{result.title}</Link></td>
                  <td className="px-4 py-4"><span className="font-bold text-slate-900">{result.score}/{result.total}</span></td>
                  <td className="px-4 py-4">#{result.rank}</td>
                  <td className="px-4 py-4">{result.percentile}th</td>
                  <td className="px-4 py-4 text-slate-600">{new Date(`${result.date}T00:00:00`).toLocaleDateString('hi-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-xl font-bold text-slate-900">अगले अभ्यास के सुझाव</h3>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> राजस्थान के इतिहास और दुर्गों का दोहराव करें</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> रोज़ाना 10 प्रश्नों का timed अभ्यास करें</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> हर उत्तर की व्याख्या ज़रूर पढ़ें</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-bold text-slate-900">विषय के अनुसार तैयारी</h3>
          <div className="mt-5 space-y-5">
            {[
              { subject: 'राजस्थान इतिहास', percent: 81 },
              { subject: 'राजस्थान भूगोल', percent: 76 },
              { subject: 'कला एवं संस्कृति', percent: 68 },
              { subject: 'सामान्य ज्ञान', percent: 72 },
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
