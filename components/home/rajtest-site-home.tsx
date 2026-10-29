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
  X,
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
  'Rajasthan GK', 'Rajasthan History', 'Rajasthan Geography', 'Rajasthan Economy',
  'Rajasthan Art & Culture', 'General Knowledge', 'History', 'Geography', 'Indian Polity',
  'Economy', 'General Studies', 'General Science', 'Maths', 'Reasoning', 'Computer',
  'General Hindi', 'General English', 'Sanskrit', 'Current Affairs',
  'Environmental Studies', 'Child Development & Pedagogy',
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
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function HomepageTestCard({ test, index }: { test: (typeof homepageTests)[number]; index: number }) {
  return (
    <article className="test-card">
      <div className="test-cover" data-tone={(index % 7) + 1}>
        <div className="test-cover-text">
          <div className="test-cover-head">
            {test.isNew && <span className="test-cover-new">NEW</span>}
            <span className="test-cover-when">🗓 {test.publishedAt}</span>
            <span className="test-cover-kind">Free Test</span>
          </div>
          <h4 className="test-cover-title" lang="hi">{test.title}</h4>
          <p className="test-cover-category">{test.subject}</p>
        </div>
      </div>
      <div className="test-card-body">
        <p className="test-card-exams">{test.examTags.join(' · ')}</p>
        <div className="test-stats">
          <span className="badge">{test.questionCount} Questions</span>
          <span className="badge">{test.duration} Mins</span>
          <span className="badge">{test.marks} Marks</span>
          <span className="badge">👥 {test.attempts}</span>
          {test.difficulty && <span className="badge badge-blue">{test.difficulty}</span>}
        </div>
        <div className="test-card-go">
          <Link href={`/exam/${test.slug}/instructions`} className="test-start-link">
            Start<span className="sr-only"> — {test.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HomePage() {
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  const [showInstall, setShowInstall] = useState(true);
  const [showTelegram, setShowTelegram] = useState(true);
  const [countdown, setCountdown] = useState('--:--:--');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [reminderSet, setReminderSet] = useState(false);

  useEffect(() => {
    const restoreNotices = window.setTimeout(() => {
      try {
        setShowInstall(localStorage.getItem('rajtest-install-dismissed') !== '1');
        setShowTelegram(localStorage.getItem('rajtest-telegram-dismissed') !== '1');
      } catch {
        setShowInstall(true);
        setShowTelegram(true);
      }
    }, 0);

    const captureInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPrompt);
    };
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    return () => {
      window.clearTimeout(restoreNotices);
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const target = getNextTestTime();
    const updateCountdown = () => setCountdown(formatCountdown(target - Date.now()));
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const availableSubjects = subjectOptions;

  const filteredGroups = useMemo(() => homepageTestGroups.map((group) => {
    const tests = Array.from(new Set(group.slugs))
      .map((slug) => homepageTests.find((test) => test.slug === slug))
      .filter((test) => test !== undefined)
      .filter((test) => selectedExam === 'all' || test.examTags.includes(selectedExam))
      .filter((test) => selectedSubject === 'all' || (subjectAliases[test.subject] ?? [test.subject]).includes(selectedSubject));
    return { ...group, tests };
  }).filter((group) => group.tests.length > 0), [selectedExam, selectedSubject]);

  const dismissNotice = (key: string, close: (visible: boolean) => void) => {
    close(false);
    try {
      localStorage.setItem(key, '1');
    } catch {
      close(false);
    }
  };

  const beginInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const addReminder = () => {
    const event = new CustomEvent('rajtest-reminder', { detail: { title: 'आज का RajTest', url: window.location.href } });
    window.dispatchEvent(event);
    setReminderSet(true);
  };

  return (
    <div>
      {showInstall && (
        <section className="border-b border-[#e7c9a8] bg-[#fff5e6]" aria-label="ऐप इंस्टॉल सूचना">
          <div className="container-shell flex flex-wrap items-center justify-between gap-3 py-2.5 text-sm text-[#231300]">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-lg" aria-hidden="true">📱</span>
              <div className="min-w-0">
                <p className="font-bold">Add to Home Screen</p>
                <p className="text-xs text-[#676e7e]">Open RajTest in Chrome for the best experience</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={beginInstall} className="min-h-9 bg-[#1a7f45] px-3 text-xs font-bold text-white disabled:opacity-70" disabled={!installPrompt}>
                {installPrompt ? 'Install' : 'Open in Chrome'}
              </button>
              <button onClick={() => dismissNotice('rajtest-install-dismissed', setShowInstall)} className="flex h-9 w-9 items-center justify-center text-[#676e7e] hover:bg-black/5" aria-label="इंस्टॉल सूचना बंद करें">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {showTelegram && (
        <section className="border-b border-[#bfe3c8] bg-[#eff8f0]" aria-label="Telegram सूचना">
          <div className="container-shell flex min-h-10 items-center justify-between gap-3 text-sm text-[#14532d]">
            <p className="min-w-0 truncate">Daily free infographic notes &amp; test updates on Telegram</p>
            <div className="flex shrink-0 items-center gap-2">
              <a href="https://t.me/rajtestofficial" target="_blank" rel="noreferrer" className="font-bold underline decoration-[#1a7f45] underline-offset-2">Join</a>
              <button onClick={() => dismissNotice('rajtest-telegram-dismissed', setShowTelegram)} className="flex h-9 w-9 items-center justify-center hover:bg-black/5" aria-label="Telegram सूचना बंद करें"><X className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      )}

      <section className="container-shell py-6 md:py-9">
        <div className="max-w-4xl">
          <p className="text-sm font-bold text-[#9a4a12]">🇮🇳 Govt. Exam की तैयारी, अब और स्मार्ट</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#231300] md:text-4xl">
            Rajtest.in — सरकारी परीक्षा टेस्ट सीरीज़
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#676e7e] md:text-base">
            Raj Test है <strong className="font-bold text-[#231300]">RPSC, CET, REET, Patwar, SSC, RRB NTPC, IBPS</strong> समेत राजस्थान की सभी भर्ती परीक्षाओं की Test Series
          </p>
          <Link href="/exam/rajtest-pyq-12/instructions" className="mt-5 inline-flex min-h-10 items-center gap-2 bg-[#1a7f45] px-4 text-sm font-bold text-white transition hover:bg-[#14532d]">
            Start Free Test <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid max-w-2xl grid-cols-3 divide-x divide-[#eadfce] border-y border-[#eadfce] bg-white">
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
      </section>

      <section className="border-y border-[#ece9e2] bg-white py-3" aria-label="इस सप्ताह के टॉप अभ्यर्थी">
        <div className="container-shell mb-2 flex items-center gap-2 text-sm font-bold text-[#9a4a12]"><Flame className="h-4 w-4" /> This Week</div>
        <div className="overflow-hidden">
          <div className="rajtest-leader-track flex w-max gap-3 px-4">
            {[...leaderboardEntries, ...leaderboardEntries].map((leader, index) => (
              <div key={`${leader.rank}-${index}`} className="flex min-w-[170px] items-center gap-2 border border-[#ece9e2] bg-[#fffdfa] px-3 py-2">
                <span className="text-sm font-extrabold text-[#9a4a12]">{index % leaderboardEntries.length < 3 ? ['🥇', '🥈', '🥉'][index % leaderboardEntries.length] : `#${index % leaderboardEntries.length + 1}`}</span>
                <span className="min-w-0 flex-1 truncate text-xs font-semibold text-[#231300]">{leader.name}</span>
                <span className="text-xs font-extrabold tabular-nums text-[#1a7f45]">{leader.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-6" aria-labelledby="next-test-heading">
        <div className="grid gap-4 border border-[#e7c9a8] bg-[#fffaf2] p-4 md:grid-cols-[1fr_auto] md:items-center md:p-5">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-[#9a4a12]"><Clock3 className="h-4 w-4" /> New Test Live Time</p>
            <h2 id="next-test-heading" className="mt-2 text-lg font-extrabold text-[#231300]">🗺️ शाम का भूगोल · संविधान · विज्ञान — 29 अक्टूबर</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#676e7e]">
              <span className="bg-white px-2.5 py-1">Geography</span>
              <span className="bg-white px-2.5 py-1">CET (12th Based)</span>
              <span className="bg-white px-2.5 py-1">CET (Graduation Based)</span>
              <span className="flex items-center gap-1"><ListFilter className="h-3.5 w-3.5" />10 Questions</span>
              <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />10 Mins</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <div className="min-w-[136px] bg-white px-3 py-2 text-center">
              <p className="text-[10px] font-bold uppercase text-[#676e7e]">Coming up</p>
              <p className="mt-1 text-lg font-extrabold tabular-nums text-[#231300]">{countdown}</p>
              <p className="text-[10px] text-[#676e7e]">IST · Daily</p>
            </div>
            <Link href="/exam/evening-geography-29/instructions" className="inline-flex min-h-10 items-center gap-2 bg-[#1a7f45] px-3 text-xs font-bold text-white hover:bg-[#14532d]">Free Test <ArrowRight className="h-4 w-4" /></Link>
            <button onClick={addReminder} className="inline-flex min-h-10 items-center gap-2 border border-[#1a7f45] bg-white px-3 text-xs font-bold text-[#1a7f45] hover:bg-[#f1faf3]"><Bell className="h-4 w-4" />{reminderSet ? 'Reminded' : 'Remind'}</button>
          </div>
        </div>
      </section>

      <section id="available-tests" className="container-shell py-4 md:py-7">
        <div className="flex flex-col gap-4 border-b border-[#ece9e2] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#9a4a12]">411 tests</p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#231300]">Available Tests</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <label className="relative">
              <span className="sr-only">परीक्षा से छाँटें</span>
              <select value={selectedExam} onChange={(event) => setSelectedExam(event.target.value)} className="h-10 w-full appearance-none border border-[#d9d4ca] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#231300] sm:w-48">
                <option value="all">All Exams</option>
                {examOptions.map((exam) => <option key={exam} value={exam}>{exam}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#676e7e]" />
            </label>
            <label className="relative">
              <span className="sr-only">विषय से छाँटें</span>
              <select value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)} className="h-10 w-full appearance-none border border-[#d9d4ca] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#231300] sm:w-44">
                <option value="all">All Subjects</option>
                {availableSubjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#676e7e]" />
            </label>
          </div>
        </div>

        <div className="divide-y divide-[#ece9e2]">
          {filteredGroups.map((group) => {
            const expanded = expandedGroups.includes(group.title);
            const visibleTests = expanded || group.isNew ? group.tests : group.tests.slice(0, 6);
            return (
              <section key={group.title} className="py-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#231300]">{group.title}</h3>
                    <span className="text-xs text-[#676e7e]">{group.count} tests</span>
                    {group.isNew && <span className="bg-[#ffe6c9] px-2 py-0.5 text-[10px] font-extrabold text-[#9a4a12]">NEW</span>}
                  </div>
                  {group.tests.length > visibleTests.length && (
                    <button onClick={() => setExpandedGroups((current) => [...current, group.title])} className="text-xs font-bold text-[#1a7f45] hover:underline">
                      → {group.tests.length - visibleTests.length} more
                    </button>
                  )}
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
          })}
          {filteredGroups.length === 0 && <p className="py-12 text-center text-sm text-[#676e7e]">इन फ़िल्टर के लिए कोई टेस्ट नहीं मिला।</p>}
        </div>
      </section>

      <section className="border-y border-[#ece9e2] bg-white py-8" aria-labelledby="tests-by-exam">
        <div className="container-shell">
          <div className="mb-4 flex items-center justify-between gap-3"><h2 id="tests-by-exam" className="text-lg font-extrabold text-[#231300]">Tests by Exam</h2><button onClick={() => { setSelectedExam('all'); setSelectedSubject('all'); document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-xs font-bold text-[#1a7f45]">All Exams <ArrowRight className="inline h-3.5 w-3.5" /></button></div>
          <div className="flex flex-wrap gap-2">
            {examOptions.map((exam) => <button key={exam} onClick={() => { setSelectedExam(exam); document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' }); }} className="border border-[#ece9e2] bg-[#fffdfa] px-3 py-2 text-xs font-semibold text-[#231300] hover:border-[#bfe3c8]">{exam}</button>)}
          </div>
        </div>
      </section>

      <section className="container-shell py-8" aria-labelledby="tests-by-subject">
        <h2 id="tests-by-subject" className="mb-4 text-lg font-extrabold text-[#231300]">Tests by Subject</h2>
        <div className="flex flex-wrap gap-2">
          {availableSubjects.map((subject) => <button key={subject} onClick={() => { setSelectedSubject(subject); document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' }); }} className="border border-[#ece9e2] bg-white px-3 py-2 text-xs font-semibold text-[#231300] hover:border-[#bfe3c8]">{subject}</button>)}
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
            ].map(({ icon: Icon, title, text, emoji }, index) => <article key={title} className="border border-[#ece9e2] bg-white p-4"><div className="flex items-center justify-between"><span className="text-xs font-extrabold text-[#9a4a12]">{index + 1}</span><span className="text-lg" aria-hidden="true">{emoji}</span></div><Icon className="mt-3 h-5 w-5 text-[#1a7f45]" /><h3 className="mt-3 text-sm font-bold text-[#231300]">{title}</h3><p className="mt-1 text-xs leading-5 text-[#676e7e]">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="about" className="container-shell py-9 pb-14 md:pb-9">
        <h2 className="text-xl font-extrabold text-[#231300]">About Rajtest.in — Rajasthan Government Exam Test Series</h2>
        <p className="mt-3 max-w-5xl text-sm leading-7 text-[#676e7e]">Rajtest.in — also written Raj Test — is a free, Hindi-language mock test platform for students preparing for Rajasthan government job examinations — RPSC, CET, REET, Patwar, SSC, RRB NTPC (Railway), IBPS, Rajasthan Police, Gram Sevak and other state recruitment exams. Students take timed practice tests on their phone and get their score, rank, correct answers and topic-wise analysis immediately. Signing in with Google is optional and is used only to save a student&apos;s own test history and show their rank on the leaderboard.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="border border-[#ece9e2] bg-white p-4"><CheckCircle2 className="h-5 w-5 text-[#1a7f45]" /><p className="mt-2 text-sm font-bold text-[#231300]">Start a test without signing in</p><p className="mt-1 text-xs text-[#676e7e]">Sign in with Google for rank, solutions and saved history.</p></div>
          <div className="border border-[#ece9e2] bg-white p-4"><ListFilter className="h-5 w-5 text-[#1a7f45]" /><p className="mt-2 text-sm font-bold text-[#231300]">Weak topic analysis</p><p className="mt-1 text-xs text-[#676e7e]">Build your next booster test from the topics you get wrong.</p></div>
          <div className="border border-[#ece9e2] bg-white p-4"><BookOpen className="h-5 w-5 text-[#1a7f45]" /><p className="mt-2 text-sm font-bold text-[#231300]">Wrong question notebook</p><p className="mt-1 text-xs text-[#676e7e]">Revisit wrong and bookmarked questions any time.</p></div>
        </div>
      </section>
    </div>

  );
}
