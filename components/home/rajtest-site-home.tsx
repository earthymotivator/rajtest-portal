'use client';

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
import {
  homepageTestGroups,
  homepageTests,
  leaderboardEntries,
} from '@/lib/mock-data';

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const examOptions = [
  'CET (12th Based)', 'CET (Graduation Based)', 'REET', '1st Grade Teacher', '2nd Grade Teacher',
  '3rd Grade Teacher', 'RSMSSB LDC', 'Patwari', 'Gram Sevak', 'Rajasthan Police', 'Police SI',
  'Jail Prahari', 'Forest Guards', 'Forester', 'Lab Assistant', 'Computer Instructor', 'SSC CHSL',
  'SSC CGL', 'IBPS', 'RRB Railway', 'Banking', 'RRB NTPC', 'RAS',
];

const subjectOptions = [
  'Rajasthan GK', 'Rajasthan History', 'Rajasthan Geography', 'Rajasthan Economy',
  'Rajasthan Art & Culture', 'General Knowledge', 'History', 'Geography', 'Indian Polity',
  'Economy', 'General Studies', 'General Science', 'Maths', 'Reasoning', 'Computer',
  'General Hindi', 'General English', 'Sanskrit', 'Current Affairs', 'Environmental Studies',
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
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map((part) => [part.type, part.value]));
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
  return (
    <article className="test-card rounded-[18px] overflow-hidden shadow-[0_10px_24px_rgba(35,19,0,0.06)]">
      <div className="test-cover" data-tone={(index % 7) + 1}>
        <div className="test-cover-text">
          <div className="test-cover-head">
            {test.isNew && <span className="test-cover-new">NEW</span>}
            <span className="test-cover-when">🗓 {test.publishedAt}</span>
            <span className="test-cover-kind">{test.type}</span>
          </div>
          <h3 className="test-cover-title">{test.title}</h3>
          <div className="test-cover-category">{test.subject}</div>
        </div>
      </div>

      <div className="test-card-body">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-[#676e7e]">
          <span className="rounded-full border border-[#eadfce] bg-[#fffaf2] px-2 py-1">{test.examTag}</span>
          <span className="rounded-full border border-[#eadfce] bg-[#fffaf2] px-2 py-1">{test.subject}</span>
        </div>

        <div className="test-card-exams">{test.description}</div>

        <div className="test-stats">
          <span className="badge badge-blue">{test.questionCount} Questions</span>
          <span className="badge">{test.duration} Mins</span>
          <span className="badge">{test.attempts.toLocaleString('en-IN')} attempts</span>
        </div>

        <div className="test-card-go">
          <Link href={`/exam/${test.slug}/instructions`} className="test-start-link rounded-full">
            Start Test
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HomePage() {
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('Rajasthan GK');
  const [showInstall, setShowInstall] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [countdown, setCountdown] = useState('00:00:00');

  useEffect(() => {
    const target = getNextTestTime();
    const updateCountdown = () => setCountdown(formatCountdown(target - Date.now()));
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setShowInstall(true);
      (event as InstallPrompt).prompt = (event as InstallPrompt).prompt || (() => Promise.resolve());
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
  }, []);

  const filteredGroups = useMemo(() => {
    return homepageTestGroups.filter((group) => {
      const examMatches = selectedExam === 'all' || group.title === selectedExam;
      const subjectMatches = selectedSubject === 'all' || group.tests.some((test) => {
        const aliases = subjectAliases[selectedSubject] ?? [selectedSubject];
        return aliases.some((alias) => test.subject.toLowerCase().includes(alias.toLowerCase()));
      });
      return examMatches && subjectMatches;
    });
  }, [selectedExam, selectedSubject]);

  const handleInstall = async () => {
    const installEvent = window.event as unknown as InstallPrompt | null;
    if (installEvent && typeof installEvent.prompt === 'function') {
      await installEvent.prompt();
    }
    setShowInstall(false);
  };

  const handleReminder = () => {
    if (reminderSet) return;
    const event = new CustomEvent('rajtest-reminder', { detail: { type: 'next-test' } });
    window.dispatchEvent(event);
    setReminderSet(true);
  };

  return (
    <div className="bg-[#f5efe7] text-[#231300]">
      {showInstall && (
        <section className="border-b border-[#e7c9a8] bg-[#fff5e6]" aria-label="ऐप इंस्टॉल सूचना">
          <div className="container-shell flex flex-col gap-3 py-2.5 text-sm text-[#231300] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-lg" aria-hidden="true">📱</span>
              <div className="min-w-0">
                <p className="font-bold">Add to Home Screen</p>
                <p className="text-xs text-[#676e7e]">Open RajTest in Chrome for the best experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleInstall} className="rounded-full bg-[#1a7f45] px-3 py-1.5 text-xs font-bold text-white">
                Install
              </button>
              <button onClick={() => setShowInstall(false)} className="rounded-full border border-[#e7c9a8] bg-white px-3 py-1.5 text-xs font-bold text-[#231300]">
                Later
              </button>
            </div>
          </div>
        </section>
      )}

      <header className="sticky top-0 z-40 border-b border-[#ece9e2] bg-white/90 backdrop-blur">
        <div className="container-shell flex min-h-[62px] items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Rajtest.in home">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#fff3e0] text-xl shadow-sm">🧠</div>
            <span className="min-w-0">
              <span className="block text-[17px] font-extrabold leading-5 text-[#231300]">Rajtest.in</span>
              <span className="block text-[11px] leading-4 text-[#676e7e]">Raj Test Series</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#231300] md:flex" aria-label="Main navigation">
            <Link href="#available-tests" className="transition hover:text-[#9a4a12]">Tests</Link>
            <Link href="#how-it-works" className="transition hover:text-[#9a4a12]">How it works</Link>
            <Link href="#about" className="transition hover:text-[#9a4a12]">About</Link>
            <Link href="/leaderboard" className="transition hover:text-[#9a4a12]">Leaderboard</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReminder}
              className="hidden items-center gap-2 rounded-full border border-[#e7c9a8] bg-[#fff8ef] px-3 py-2 text-xs font-bold text-[#231300] md:inline-flex"
            >
              <Bell className="h-3.5 w-3.5 text-[#9a4a12]" />
              {reminderSet ? 'Reminder set' : 'Notify me'}
            </button>
            <Link href="/exams" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a7f45] px-3 py-2.5 text-xs font-bold text-white shadow-[0_12px_20px_rgba(26,127,69,0.22)] transition sm:px-4 sm:text-sm">
              Free Test <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden rounded-b-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(154,74,18,0.08),transparent_30%),linear-gradient(180deg,#fffaf4_0%,#fff7ef_100%)] shadow-[0_12px_30px_rgba(35,19,0,0.04)] md:rounded-none">
          <div className="container-shell py-6 md:py-12">
            <div className="grid items-center gap-7 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-sm font-bold text-[#9a4a12]">🇮🇳 Govt. Exam की तैयारी, अब और स्मार्ट</p>
                <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#231300] md:text-5xl">
                  Rajtest.in — सरकारी परीक्षा टेस्ट सीरीज़
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#676e7e] md:text-base">
                  Raj Test है <strong className="font-bold text-[#231300]">RPSC, CET, REET, Patwar, SSC, RRB NTPC, IBPS</strong> समेत राजस्थान की सभी भर्ती/सामान्य प्रतियोगिता परीक्षाओं के लिए तैयार किया गया स्मार्ट मोबाइल-एप ऐप स्टाइल प्लेटफ़ॉर्म है।
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link href="/exam/rajtest-pyq-12/instructions" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1a7f45] px-5 text-sm font-bold text-white transition hover:bg-[#14532d]">
                    Start Free Test <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="#available-tests" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7c9a8] bg-white px-5 text-sm font-bold text-[#231300] transition hover:bg-[#fff7ef]">
                    Browse Tests <ChevronDown className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-6 grid max-w-2xl grid-cols-3 divide-x divide-[#eadfce] overflow-hidden rounded-[20px] border border-[#eadfce] bg-white/80 backdrop-blur-sm shadow-sm">
                  {[
                    { value: '411', label: 'पेपर', icon: BookOpen },
                    { value: '30,531', label: 'टेस्ट दिए गए', icon: CheckCircle2 },
                    { value: '1,892', label: 'छात्र', icon: GraduationCap },
                  ].map(({ value, label, icon: Icon }) => (
                    <div key={label} className="px-2 py-3 text-center sm:px-5 sm:py-4">
                      <Icon className="mx-auto h-4 w-4 text-[#1a7f45]" />
                      <p className="mt-2 text-lg font-extrabold tabular-nums text-[#231300] sm:text-xl">{value}</p>
                      <p className="text-[10px] leading-4 text-[#676e7e] sm:text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[30px] border border-[#eadfce] bg-[#fff8ef] p-4 shadow-[0_22px_50px_rgba(154,74,18,0.08)] md:p-6">
                  <div className="rounded-[24px] bg-[#231300] p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange-200">Next test live</p>
                        <h2 className="mt-2 text-lg font-extrabold sm:text-xl">🗺️ भूगोल · संविधान · विज्ञान</h2>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase">29 Oct</span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: 'Time left', value: countdown },
                        { label: 'Question', value: '10' },
                        { label: 'Marks', value: '10' },
                      ].map(({ label, value }) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-2.5">
                          <p className="text-[10px] uppercase text-orange-100/80">{label}</p>
                          <p className="mt-2 text-base font-extrabold tabular-nums text-white">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-orange-50/80">
                      <span className="rounded-full bg-white/10 px-2.5 py-1">Geography</span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1">CET (12th Based)</span>
                      <span className="rounded-full bg-white/10 px-2.5 py-1">CET (Graduation Based)</span>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                      <div>
                        <p className="text-[10px] uppercase text-orange-100/80">Starts at</p>
                        <p className="font-bold">4:00 PM</p>
                      </div>
                      <Link href="/exam/rajtest-pyq-12/instructions" className="inline-flex items-center gap-2 rounded-full bg-[#f5ab4c] px-4 py-2.5 text-sm font-bold text-[#231300]">
                        Attempt now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#ece9e2] bg-white py-3" aria-label="इस सप्ताह के टॉप अभ्यर्थी">
          <div className="container-shell mb-2 flex items-center gap-2 text-sm font-bold text-[#9a4a12]"><Flame className="h-4 w-4" /> This Week</div>
          <div className="overflow-hidden">
            <div className="rajtest-leader-track flex w-max gap-3 px-4">
              {[...leaderboardEntries, ...leaderboardEntries].map((leader, index) => (
                <div key={`${leader.name}-${index}`} className="flex min-w-[220px] items-center gap-3 rounded-full border border-[#ece9e2] bg-[#fffaf5] px-3 py-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black text-[#231300] ${leader.color}`}>
                    {leader.rank}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-[#231300]">{leader.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#676e7e]">{leader.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="available-tests" className="container-shell py-4 md:py-7">
          <div className="flex flex-col gap-4 border-b border-[#ece9e2] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#9a4a12]">{homepageTests.length} tests</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#231300]">Available Tests</h2>
            </div>
            <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-2 sm:flex">
              <label className="relative block w-full">
                <span className="sr-only">परीक्षा से छाँटें</span>
                <select
                  value={selectedExam}
                  onChange={(event) => setSelectedExam(event.target.value)}
                  className="w-full appearance-none rounded-full border border-[#ece9e2] bg-white px-3 py-2 text-xs font-semibold text-[#231300] outline-none ring-0 sm:w-auto"
                >
                  <option value="all">All Exams</option>
                  {examOptions.map((exam) => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </label>

              <label className="relative block w-full">
                <span className="sr-only">विषय से छाँटें</span>
                <select
                  value={selectedSubject}
                  onChange={(event) => setSelectedSubject(event.target.value)}
                  className="w-full appearance-none rounded-full border border-[#ece9e2] bg-white px-3 py-2 text-xs font-semibold text-[#231300] outline-none ring-0 sm:w-auto"
                >
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-5">
            {filteredGroups.length ? (
              filteredGroups.map((group) => {
                const visibleTests = group.tests.filter((test) => {
                  const aliases = subjectAliases[selectedSubject] ?? [selectedSubject];
                  return selectedSubject === 'all' || aliases.some((alias) => test.subject.toLowerCase().includes(alias.toLowerCase()));
                });

                if (!visibleTests.length) return null;

                return (
                  <section key={group.title} className="mb-8">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-extrabold text-[#231300]">{group.title}</h3>
                      <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#676e7e]">{visibleTests.length} tests</span>
                    </div>
                    <div className="catalogue-row-scroll">
                      {visibleTests.map((test, index) => (
                        <div className="catalogue-row-item" key={`${group.title}-${test.id}`}>
                          <HomepageTestCard test={test} index={index} />
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })
            ) : (
              <p className="py-12 text-center text-sm text-[#676e7e]">इन फ़िल्टर के लिए कोई टेस्ट नहीं मिला।</p>
            )}
          </div>
        </section>

        <section className="border-y border-[#ece9e2] bg-white py-8" aria-labelledby="tests-by-exam">
          <div className="container-shell">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 id="tests-by-exam" className="text-lg font-extrabold text-[#231300]">Tests by Exam</h2>
              <button onClick={() => { setSelectedExam('all'); document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-xs font-bold text-[#1a7f45]">
                Reset
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', ...examOptions].map((exam) => (
                <button
                  key={exam}
                  onClick={() => {
                    setSelectedExam(exam === 'all' ? 'all' : exam);
                    document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`rounded-full border px-3 py-2 text-xs font-semibold ${selectedExam === exam ? 'border-[#1a7f45] bg-[#ecf9f1] text-[#14532d]' : 'border-[#ece9e2] bg-white text-[#231300]'} w-full sm:w-auto`}
                >
                  {exam === 'all' ? 'All Exams' : exam}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#ece9e2] bg-[#fffdfa] py-9" aria-labelledby="after-test-heading">
          <div className="container-shell">
            <h2 id="after-test-heading" className="text-xl font-extrabold text-[#231300]">What happens after a test?</h2>
            <p className="mt-1 text-sm text-[#676e7e]">A simple 4-step improvement process</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: CheckCircle2, title: 'Take a test and know your level', text: 'Get a basic score, or your official rank when signed in.', emoji: '📝' },
                { icon: ListFilter, title: 'Find your weak topics', text: 'See your accuracy, speed and strongest/weakest topics.', emoji: '📊' },
                { icon: Medal, title: 'Revise the questions you got wrong', text: 'Use the Wrong Notebook, bookmarks and reminders.', emoji: '🔁' },
                { icon: Trophy, title: 'Build your Booster Test', text: 'Practise the topics you are weakest in.', emoji: '🚀' },
              ].map(({ icon: Icon, title, text, emoji }, index) => (
                <article key={title} className="rounded-[20px] border border-[#ece9e2] bg-white p-4 shadow-[0_10px_22px_rgba(35,19,0,0.04)]">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{emoji}</span>
                    <Icon className="h-5 w-5 text-[#1a7f45]" />
                  </div>
                  <h3 className="mt-3 text-sm font-extrabold text-[#231300]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#676e7e]">{text}</p>
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[#9a4a12]">Step {index + 1}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="container-shell py-9 pb-14 md:pb-9">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-bold text-[#9a4a12]">About Rajtest.in</p>
              <h2 className="mt-2 text-2xl font-extrabold text-[#231300]">Rajasthan Government Exam Test Series</h2>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-[#676e7e]">
                Rajtest.in — also written Raj Test — is a free, Hindi-language mock test platform for students preparing for Rajasthan government recruitment and competitive exams. It helps candidates practice with realistic mock tests, track their speed and accuracy, and build confidence for high-stakes exam preparation.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] border border-[#ece9e2] bg-white p-4">
                <CheckCircle2 className="h-5 w-5 text-[#1a7f45]" />
                <p className="mt-2 text-sm font-bold text-[#231300]">Start a test without signin</p>
                <p className="mt-1 text-xs text-[#676e7e]">Fast access to practice sets</p>
              </div>
              <div className="rounded-[20px] border border-[#ece9e2] bg-white p-4">
                <BookOpen className="h-5 w-5 text-[#1a7f45]" />
                <p className="mt-2 text-sm font-bold text-[#231300]">Mock tests by subject</p>
                <p className="mt-1 text-xs text-[#676e7e]">Targeted practice for weak topics</p>
              </div>
              <div className="rounded-[20px] border border-[#ece9e2] bg-white p-4">
                <Trophy className="h-5 w-5 text-[#1a7f45]" />
                <p className="mt-2 text-sm font-bold text-[#231300]">Leaderboards and ranks</p>
                <p className="mt-1 text-xs text-[#676e7e]">Benchmark your progress</p>
              </div>
              <div className="rounded-[20px] border border-[#ece9e2] bg-white p-4">
                <Clock3 className="h-5 w-5 text-[#1a7f45]" />
                <p className="mt-2 text-sm font-bold text-[#231300]">Time-bound practice</p>
                <p className="mt-1 text-xs text-[#676e7e]">Improve speed and accuracy</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
