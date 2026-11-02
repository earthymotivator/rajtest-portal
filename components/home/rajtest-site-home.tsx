import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Flame,
  GraduationCap,
  ListFilter,
  Medal,
  Trophy,
} from 'lucide-react';
import { homepageTestGroups, homepageTests, leaderboardEntries } from '@/lib/mock-data';

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const examOptions = [
  'CET (12th Based)',
  'CET (Graduation Based)',
  'REET',
  '1st Grade Teacher',
  '2nd Grade Teacher',
  '3rd Grade Teacher',
  'RSMSSB LDC',
  'Patwari',
  'Gram Sevak',
  'Rajasthan Police',
  'Police SI',
  'Jail Prahari',
  'Forest Guards',
  'Forester',
  'Lab Assistant',
  'Computer Instructor',
  'SSC CHSL',
  'SSC CGL',
  'IBPS',
  'RRB Railway',
  'Banking',
  'RRB NTPC',
  'RAS',
];

const subjectOptions = [
  'Rajasthan GK',
  'Rajasthan History',
  'Rajasthan Geography',
  'Rajasthan Economy',
  'Rajasthan Art & Culture',
  'General Knowledge',
  'History',
  'Geography',
  'Indian Polity',
  'Economy',
  'General Studies',
  'General Science',
  'Maths',
  'Reasoning',
  'Computer',
  'General Hindi',
  'General English',
  'Sanskrit',
  'Current Affairs',
  'Environmental Studies',
  'Child Development & Pedagogy',
];

const subjectAliases: Record<string, string[]> = {
  'Rajasthan GK': ['Rajasthan GK', 'Rajasthan History', 'Rajasthan Geography', 'Rajasthan Economy', 'Rajasthan Art & Culture', 'General Knowledge', 'History', 'Geography', 'Economy'],
  'General English': ['General English'],
  'Current Affairs': ['Current Affairs'],
  'General Awareness': ['General Awareness', 'General Studies', 'Indian Polity'],
  Maths: ['Maths'],
  'General Science': ['General Science', 'Environmental Studies'],
  Reasoning: ['Reasoning'],
};

function getNextTestTime() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(new Date()).map((part) => [part.type, part.value]),
  );

  const day = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  const hour = Number(parts.hour);
  const nextHour = hour < 16 ? 16 : hour < 20 ? 20 : 8;
  const nextDay = hour < 20 ? day : day + 24 * 60 * 60 * 1000;

  return nextDay + (nextHour - 5.5) * 60 * 60 * 1000;
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function HomepageTestCard({ test, index }: { test: (typeof homepageTests)[number]; index: number }) {
  const primaryTag = test.examTags?.[0] ?? test.subject;

  return (
    <article className="test-card rounded-[18px] overflow-hidden shadow-[0_10px_24px_rgba(35,19,0,0.06)]">
      <div className="test-cover" data-tone={(index % 7) + 1}>
        <div className="test-cover-text">
          <div className="test-cover-head">
            {test.isNew && <span className="test-cover-new">NEW</span>}
            <span className="test-cover-when">🗓 {test.publishedAt}</span>
            <span className="test-cover-kind">{test.subject}</span>
          </div>
          <h3 className="test-cover-title">{test.title}</h3>
          <div className="test-cover-category">{test.subject}</div>
        </div>
      </div>

      <div className="test-card-body">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-[#676e7e]">
          {test.examTags?.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full border border-[#eadfce] bg-[#fffaf2] px-2 py-1">
              {tag}
            </span>
          ))}
          <span className="rounded-full border border-[#eadfce] bg-[#fffaf2] px-2 py-1">{test.subject}</span>
        </div>

        <div className="test-card-exams">
          {primaryTag} • {test.questionCount} questions • {test.duration} min • {test.attempts.toLocaleString('en-IN')} attempts
        </div>

        <div className="test-stats">
          <span className="badge badge-blue">{test.questionCount} Questions</span>
          <span className="badge">{test.duration} Mins</span>
          <span className="badge">{test.attempts.toLocaleString('en-IN')} attempts</span>
        </div>

        <div className="test-card-go">
          <Link href={`/exam/${test.slug}`} className="test-start-link rounded-full">
            Start Test
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HomePage() {
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [search, setSearch] = useState('');
  const [countdown, setCountdown] = useState(formatCountdown(getNextTestTime() - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(formatCountdown(getNextTestTime() - Date.now()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    return homepageTestGroups
      .map((group) => {
        const tests = homepageTests.filter((test) => group.slugs.includes(test.slug));
        const visibleTests = tests.filter((test) => {
          const matchesExam = selectedExam === 'All' || test.examTags?.includes(selectedExam);
          const matchesSubject =
            selectedSubject === 'All' ||
            test.subject === selectedSubject ||
            (subjectAliases[selectedSubject] ?? []).includes(test.subject);
          const matchesQuery =
            !query ||
            test.title.toLowerCase().includes(query) ||
            test.subject.toLowerCase().includes(query) ||
            test.examTags.join(' ').toLowerCase().includes(query);

          return matchesExam && matchesSubject && matchesQuery;
        });

        return { ...group, tests: visibleTests };
      })
      .filter((group) => group.tests.length > 0);
  }, [search, selectedExam, selectedSubject]);

  const featured = useMemo(() => homepageTests.slice(0, 4), []);

  return (
    <div className="bg-[#fffdfa] text-[#231300]">
      <section className="container-shell pb-6 pt-7 md:pb-10 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-[#ece9e2] bg-[radial-gradient(circle_at_top_left,_rgba(154,74,18,0.12),transparent_42%),linear-gradient(135deg,#fefaf3,#fff)] p-5 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#9a4a12]">
              <span className="pill border border-[#f0dfb8] bg-[#fff4dc] text-[#9a4a12]">Free Hindi Tests</span>
              <span className="pill border border-[#dfeadf] bg-[#edf9f0] text-[#1a7f45]">Live practice</span>
            </div>

            <h1 className="max-w-xl text-3xl font-black leading-tight text-[#231300] md:text-5xl">
              राजस्थान Govt Exams की तैयारी, हर दिन एक smart test.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#676e7e] md:text-base">
              Free mock tests, Rajasthan GK quizzes, PYQ sets and exam-focused practice for RPSC, CET, REET, Patwar and Police exams.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#available-tests" className="inline-flex items-center justify-center rounded-full bg-[#1a7f45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#14532d]">
                Start a free test
              </Link>
              <Link href="/exams" className="inline-flex items-center justify-center rounded-full border border-[#d9d1c5] bg-white px-5 py-3 text-sm font-bold text-[#231300] transition hover:border-[#c9c0b2]">
                Browse exams
              </Link>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#ece9e2] bg-white p-3">
                <div className="mb-2 flex items-center gap-2 text-[#1a7f45]"><CheckCircle2 className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-[0.16em]">Daily</span></div>
                <div className="text-2xl font-black">1200+</div>
                <div className="text-[11px] text-[#676e7e]">practice questions</div>
              </div>
              <div className="rounded-2xl border border-[#ece9e2] bg-white p-3">
                <div className="mb-2 flex items-center gap-2 text-[#9a4a12]"><Flame className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-[0.16em]">Live</span></div>
                <div className="text-2xl font-black">58%</div>
                <div className="text-[11px] text-[#676e7e]">avg. improvement</div>
              </div>
              <div className="rounded-2xl border border-[#ece9e2] bg-white p-3">
                <div className="mb-2 flex items-center gap-2 text-[#2857a8]"><Medal className="h-4 w-4" /> <span className="text-xs font-bold uppercase tracking-[0.16em]">Rank</span></div>
                <div className="text-2xl font-black">#1</div>
                <div className="text-[11px] text-[#676e7e]">leaderboard streak</div>
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#ece9e2] bg-white p-5 shadow-[0_12px_30px_rgba(35,19,0,0.05)] md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#676e7e]">Next live test</p>
                <h2 className="mt-1 text-xl font-black">Rajasthan GK</h2>
              </div>
              <div className="rounded-full bg-[#fff6ef] p-2 text-[#9a4a12]">
                <Bell className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[#f0e5d4] bg-[#fffaf4] p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9a4a12]">Starts in</div>
              <div className="mt-3 text-4xl font-black tracking-tight text-[#231300]">{countdown}</div>
              <div className="mt-2 text-xs text-[#676e7e]">16:00 IST • 10 Questions • 10 mins</div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-[#676e7e]">
              <div className="flex items-center justify-between rounded-xl border border-[#ece9e2] bg-[#faf9f6] px-3 py-2">
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#1a7f45]" /> Current affairs</span>
                <span className="font-bold text-[#231300]">Hindi</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#ece9e2] bg-[#faf9f6] px-3 py-2">
                <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#1a7f45]" /> Duration</span>
                <span className="font-bold text-[#231300]">10 mins</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-[#ece9e2] bg-[#faf9f6] px-3 py-2">
                <span className="flex items-center gap-2"><Trophy className="h-4 w-4 text-[#1a7f45]" /> Leaderboard</span>
                <span className="font-bold text-[#231300]">Live</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-shell pb-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#676e7e]">Curated practice</p>
            <h2 id="available-tests" className="mt-1 text-2xl font-black text-[#231300] md:text-3xl">Available tests</h2>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tests, subjects or tags"
                className="w-full rounded-full border border-[#e5dfd4] bg-white px-4 py-2.5 pr-10 text-sm outline-none ring-0 placeholder:text-[#8a8d97] focus:border-[#1a7f45] sm:w-72"
              />
              <ListFilter className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#676e7e]" />
            </div>
            <select
              value={selectedExam}
              onChange={(event) => setSelectedExam(event.target.value)}
              className="rounded-full border border-[#e5dfd4] bg-white px-4 py-2.5 text-sm text-[#231300] outline-none focus:border-[#1a7f45]"
            >
              <option value="All">All exams</option>
              {examOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <select
              value={selectedSubject}
              onChange={(event) => setSelectedSubject(event.target.value)}
              className="rounded-full border border-[#e5dfd4] bg-white px-4 py-2.5 text-sm text-[#231300] outline-none focus:border-[#1a7f45]"
            >
              <option value="All">All subjects</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="container-shell pb-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#231300]">
            <GraduationCap className="h-5 w-5 text-[#1a7f45]" />
            <h3 className="text-lg font-black">Featured collections</h3>
          </div>
          <Link href="/exams" className="inline-flex items-center gap-1 text-sm font-bold text-[#1a7f45]">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((test) => (
            <Link key={test.id} href={`/exam/${test.slug}`} className="rounded-[22px] border border-[#ece9e2] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-[#f0faf3] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1a7f45]">
                  {test.isNew ? 'New' : 'Free'}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#676e7e]">{test.publishedAt}</span>
              </div>
              <div className="mb-3 text-lg font-black text-[#231300]">{test.title}</div>
              <div className="text-sm text-[#676e7e]">{test.subject}</div>
              <div className="mt-4 flex items-center justify-between text-xs text-[#676e7e]">
                <span>{test.questionCount} Qs</span>
                <span>{test.duration} mins</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8">
        {filteredGroups.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-[#d5d0c8] bg-white p-8 text-center text-[#676e7e]">
            No tests match your current filters.
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.title} className="mb-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#676e7e]">{group.title}</p>
                  <h3 className="mt-1 text-xl font-black text-[#231300]">{group.count} tests</h3>
                </div>
                <Link href="/exams" className="inline-flex items-center gap-1 text-sm font-bold text-[#1a7f45]">
                  Explore <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                </Link>
              </div>

              <div className="catalogue-row-scroll">
                {group.tests.map((test, index) => (
                  <div key={test.id} className="catalogue-row-item">
                    <HomepageTestCard test={test} index={index} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <section className="container-shell pb-10">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#231300]">
            <Trophy className="h-5 w-5 text-[#9a4a12]" />
            <h3 className="text-lg font-black">Leaderboard</h3>
          </div>
          <Link href="/leaderboard" className="text-sm font-bold text-[#1a7f45]">View leaderboard</Link>
        </div>

        <div className="rounded-[24px] border border-[#ece9e2] bg-white p-4 shadow-[0_10px_30px_rgba(35,19,0,0.04)]">
          <div className="space-y-3">
            {leaderboardEntries.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-[#f1eee8] bg-[#fffdfb] px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${entry.color}`}>
                    {entry.rank}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#231300]">{entry.name}</div>
                    <div className="text-[11px] text-[#676e7e]">Top score this week</div>
                  </div>
                </div>
                <div className="text-sm font-black text-[#231300]">{entry.score}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

export const __homepage_debug = {
  examOptions,
  subjectOptions,
  subjectAliases,
};
