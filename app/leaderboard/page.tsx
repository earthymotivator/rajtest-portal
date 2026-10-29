import Link from 'next/link';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { leaderboardEntries } from '@/lib/mock-data';

export default function LeaderboardPage() {
  return (
    <div className="container-shell py-10 md:py-14">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[var(--saffron)]">
        <ArrowLeft className="h-4 w-4" /> होम पर वापस
      </Link>
      <div className="mt-7 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="bg-[var(--ink)] p-6 text-white md:p-8">
          <Trophy className="h-8 w-8 text-orange-200" />
          <p className="mt-6 text-sm font-semibold text-orange-200">इस सप्ताह</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">लीडरबोर्ड</h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">साप्ताहिक टेस्ट स्कोर के आधार पर सबसे आगे चल रहे अभ्यर्थी। अगला टेस्ट देकर अपनी रैंक सुधारें।</p>
          <Link href="/exams" className="mt-7 inline-flex items-center gap-2 bg-[var(--saffron)] px-4 py-3 text-sm font-bold text-white hover:bg-[var(--saffron-dark)]">
            फ्री टेस्ट दें <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <section className="border border-slate-200 bg-white" aria-label="साप्ताहिक रैंकिंग">
          <div className="grid grid-cols-[52px_1fr_auto] border-b border-slate-200 px-4 py-3 text-xs font-bold text-slate-500 sm:px-6">
            <span>रैंक</span><span>अभ्यर्थी</span><span>स्कोर</span>
          </div>
          <div className="divide-y divide-slate-100">
            {leaderboardEntries.map((entry) => (
              <div key={entry.rank} className="grid grid-cols-[52px_1fr_auto] items-center px-4 py-4 sm:px-6">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${entry.color}`}>{entry.rank}</span>
                <span className="truncate pr-3 text-sm font-semibold text-[var(--ink)]">{entry.name}</span>
                <span className="text-sm font-extrabold text-[var(--ink)]">{entry.score}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
