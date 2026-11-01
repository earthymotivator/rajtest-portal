export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Question = {
  id: string;
  text: string;
  hindiText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
};

export type Exam = {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: number;
  totalQuestions: number;
  difficulty: Difficulty;
  level: string;
  status: 'Live' | 'Upcoming' | 'Closed';
  attempts: number;
  price: number;
  description: string;
  icon: string;
  highlights: string[];
  syllabus: string[];
};

export type StudentResult = {
  id: string;
  examId: string;
  title: string;
  score: number;
  total: number;
  rank: number;
  date: string;
  percentile: number;
};

export type HomepageTest = {
  id: string;
  slug: string;
  title: string;
  subject: string;
  examTags: string[];
  publishedAt: string;
  questionCount: number;
  duration: number;
  marks: number;
  attempts: number;
  difficulty?: Difficulty;
  isNew?: boolean;
};

export type SiteData = {
  examCategories: Array<{ slug: string; title: string; description: string; icon: string }>;
  homepageTests: HomepageTest[];
  exams: Exam[];
  examQuestions: Record<string, Question[]>;
  leaderboardEntries: Array<{ rank: string; name: string; score: string; color: string }>;
  dashboardResults: StudentResult[];
  adminStats: Array<{ label: string; value: string; change: string }>;
  adminRecentExams: Array<{ title: string; students: string; completion: string }>;
};

const STORAGE_KEY = 'rajtest-site-state-v1';

const seedCategories = [
  { slug: 'rpsc', title: 'RPSC', description: 'RAS, School Lecturer, SI', icon: '🏛️' },
  { slug: 'cet', title: 'CET', description: 'Graduation और Senior Secondary', icon: '📝' },
  { slug: 'reet', title: 'REET', description: 'Level I और Level II', icon: '📚' },
  { slug: 'patwar', title: 'Patwar', description: 'राजस्थान पटवारी भर्ती', icon: '🗺️' },
  { slug: 'police', title: 'Police', description: 'Constable और SI भर्ती', icon: '🛡️' },
  { slug: 'rajasthan-gk', title: 'Rajasthan GK', description: 'इतिहास, भूगोल और संस्कृति', icon: '🌄' },
];

const cetTargets = ['CET (12th Based)', 'CET (Graduation Based)'];
const broadTargets = [...cetTargets, 'REET', 'Patwari', 'Rajasthan Police', 'SSC CGL', 'IBPS', 'RRB NTPC', 'RAS'];

function createHomepageTests(
  slugPrefix: string,
  subject: string,
  titles: string[],
  examTags: string[],
  publishedAt: string,
  questionCount = 10,
  duration = 10,
): HomepageTest[] {
  return titles.map((title, index) => ({
    id: `${slugPrefix}-${index + 1}`,
    slug: `${slugPrefix}-${index + 1}`,
    title,
    subject,
    examTags,
    publishedAt,
    questionCount,
    duration,
    marks: questionCount,
    attempts: 5 + index * 7,
    difficulty: index % 3 === 0 ? 'Medium' : 'Easy',
  }));
}

const newHomepageTests: HomepageTest[] = [
  { id: 'reasoning-math-29-oct', slug: 'reasoning-math-29-oct', title: '🧠 दोपहर का रीजनिंग + गणित — 29 अक्टूबर', subject: 'Reasoning', examTags: cetTargets, publishedAt: '29 Oct 2026', questionCount: 10, duration: 10, marks: 10, attempts: 7, difficulty: 'Easy', isNew: true },
  { id: 'rajtest-pyq-12-feed', slug: 'rajtest-pyq-12', title: 'RajTest PYQ #12', subject: 'Rajasthan GK', examTags: [...cetTargets, 'RAS'], publishedAt: '29 Oct 2026', questionCount: 20, duration: 10, marks: 20, attempts: 33, difficulty: 'Medium', isNew: true },
  { id: 'rajtest-pyq-11-feed', slug: 'rajtest-pyq-11', title: 'RajTest PYQ #11', subject: 'Rajasthan GK', examTags: [...cetTargets, 'RAS'], publishedAt: '28 Oct 2026', questionCount: 20, duration: 10, marks: 20, attempts: 13, difficulty: 'Easy', isNew: true },
  { id: 'daily-hard-30-feed', slug: 'daily-hard-30', title: '🎯 Daily #30 — 27 अक्टूबर के 10 सबसे कठिन प्रश्न', subject: 'General Knowledge', examTags: cetTargets, publishedAt: '27 Oct 2026', questionCount: 10, duration: 10, marks: 10, attempts: 5, isNew: true },
  { id: 'evening-geography-29-feed', slug: 'evening-geography-29', title: '🗺️ शाम का भूगोल · संविधान · विज्ञान — 29 अक्टूबर', subject: 'Geography', examTags: cetTargets, publishedAt: '29 Oct 2026', questionCount: 10, duration: 10, marks: 10, attempts: 7, isNew: true },
  { id: 'afternoon-reasoning-27-feed', slug: 'afternoon-reasoning-27', title: '🧠 दोपहर का रीजनिंग + गणित — 27 अक्टूबर', subject: 'Reasoning', examTags: cetTargets, publishedAt: '27 Oct 2026', questionCount: 10, duration: 10, marks: 10, attempts: 1, isNew: true },
  { id: 'gk-marathon-2-feed', slug: 'gk-marathon-day-2', title: 'General Knowledge Marathon Series Day 2', subject: 'General Knowledge', examTags: broadTargets, publishedAt: '27 Oct 2026', questionCount: 20, duration: 10, marks: 20, attempts: 6, difficulty: 'Hard', isNew: true },
  { id: 'rajtest-pyq-10-feed', slug: 'rajtest-pyq-10', title: 'RajTest PYQ #10', subject: 'Rajasthan GK', examTags: [...cetTargets, 'RAS'], publishedAt: '27 Oct 2026', questionCount: 20, duration: 10, marks: 20, attempts: 4, difficulty: 'Medium', isNew: true },
  { id: 'morning-rajasthan-gk-27-feed', slug: 'morning-rajasthan-gk-27', title: '☀️ सुबह का राजस्थान GK — 27 अक्टूबर', subject: 'Rajasthan GK', examTags: cetTargets, publishedAt: '27 Oct 2026', questionCount: 10, duration: 10, marks: 10, attempts: 6, isNew: true },
  { id: 'daily-hard-29-feed', slug: 'daily-hard-29', title: '🎯 Daily #29 — 26 अक्टूबर के 10 सबसे कठिन प्रश्न', subject: 'General Knowledge', examTags: cetTargets, publishedAt: '26 Oct 2026', questionCount: 10, duration: 10, marks: 10, attempts: 11, difficulty: 'Medium', isNew: true },
];

const seedHomepageTests: HomepageTest[] = [
  ...newHomepageTests,
  ...createHomepageTests('rajtest-pyq', 'Rajasthan GK', ['RajTest PYQ #9', 'RajTest PYQ #8', 'RajTest PYQ #7', 'RajTest PYQ #6', 'RajTest PYQ #5', 'RajTest PYQ #4', 'RajTest PYQ #3'], [...cetTargets, 'RAS'], '26 Oct 2026', 20),
  ...createHomepageTests('english-vocab', 'General English', ['Daily Vocab Quiz 23rd Oct', 'Daily Vocabulary Quiz 22nd Oct', 'Daily Vocabulary Quiz 21st Oct', 'Daily Vocabulary Quiz 19th Oct', 'Degrees Of Adjectives'], broadTargets, '23 Oct 2026', 10, 5),
  ...createHomepageTests('current-affairs', 'Current Affairs', ['Daily Current Affairs Quiz 23rd Oct', 'Daily Current Affairs Quiz', "Today's Current Affairs Quiz 21st Oct", 'Daily Current Affairs Quiz 19th Oct'], broadTargets, '23 Oct 2026', 10, 5),
  ...createHomepageTests('general-awareness', 'General Awareness', ['General Awareness', 'General Awareness Quiz 14th Oct', 'General Awareness Quiz 13th Oct', 'General Awareness Practice Set'], broadTargets, '16 Oct 2026'),
  ...createHomepageTests('maths-pyq', 'Maths', ['Maths Marathon Series Day 1', 'NUMBER SYSTEM PYQ SET-2', 'NUMBER SYSTEM PYQ SET-1', 'Maths PYQ', 'त्रिभुज', 'Trigonometry PYQ', 'Data Interpretation In Hindi', 'HCF LCM PYQ', 'Algebra', 'Number Series'], cetTargets, '23 Oct 2026', 20),
  ...createHomepageTests('general-science', 'General Science', ['General Science PYQ', 'मानव रोग एवं रोगजनक', 'पोषण एवं विटामिन', 'Agriculture, Horticulture & Forestry (Rajasthan)', 'Medical Specialists — कौन सा Doctor किस रोग का इलाज करता है?', 'Cardiopulmonary Resuscitation (CPR)', 'भारत का अंतरिक्ष अनुसंधान कार्यक्रम', 'प्रकाश का परावर्तन — गोलीय दर्पण एवं वर्ण-विक्षेपण', 'मानव स्वास्थ्य — रोग एवं रक्त समूह', 'मानव स्वास्थ्य — ABO प्रणाली'], broadTargets, '16 Oct 2026'),
];

const seedExams: Exam[] = [
  { id: 'rpsc-ras-practice', slug: 'rpsc-ras-practice', title: 'RPSC RAS Practice Set', category: 'RPSC', duration: 20, totalQuestions: 10, difficulty: 'Medium', level: 'Preliminary', status: 'Live', attempts: 652, price: 0, description: 'RPSC अभ्यर्थियों के लिए राजस्थान सामान्य ज्ञान का परीक्षा-स्तर अभ्यास।', icon: '🏛️', highlights: ['RAS परीक्षा पैटर्न', 'हिंदी में प्रश्न', 'तुरंत परिणाम'], syllabus: ['राजस्थान इतिहास', 'भूगोल', 'राजव्यवस्था'] },
  { id: 'rajtest-pyq-12', slug: 'rajtest-pyq-12', title: 'RajTest PYQ #12', category: 'Rajasthan GK', duration: 15, totalQuestions: 10, difficulty: 'Medium', level: 'सामान्य ज्ञान', status: 'Live', attempts: 30470, price: 0, description: 'राजस्थान इतिहास, भूगोल और कला-संस्कृति पर आधारित पिछली परीक्षाओं का सेट।', icon: '🌄', highlights: ['10 वस्तुनिष्ठ प्रश्न', 'तुरंत स्कोर और उत्तर', 'हिंदी में अभ्यास'], syllabus: ['राजस्थान इतिहास', 'भूगोल', 'कला एवं संस्कृति', 'सामान्य ज्ञान'] },
  { id: 'daily-rajasthan-gk', slug: 'daily-rajasthan-gk', title: 'आज का राजस्थान GK', category: 'Rajasthan GK', duration: 15, totalQuestions: 10, difficulty: 'Easy', level: 'Daily Quiz', status: 'Live', attempts: 1888, price: 0, description: 'रोज़ाना अभ्यास के लिए राजस्थान सामान्य ज्ञान का छोटा timed quiz।', icon: '☀️', highlights: ['रोज़ नया सेट', 'हल सहित परिणाम', 'मोबाइल पर आसान अभ्यास'], syllabus: ['राजस्थान सामान्य ज्ञान', 'समसामयिकी'] },
  { id: 'cet-graduate-pyq', slug: 'cet-graduate-pyq', title: 'CET Graduation PYQ Set', category: 'CET', duration: 20, totalQuestions: 10, difficulty: 'Medium', level: 'Graduation Level', status: 'Live', attempts: 934, price: 0, description: 'CET पैटर्न पर राजस्थान GK और सामान्य योग्यता का अभ्यास सेट।', icon: '📝', highlights: ['परीक्षा पैटर्न आधारित', 'समयबद्ध अभ्यास', 'प्रयास के बाद समीक्षा'], syllabus: ['राजस्थान GK', 'सामान्य विज्ञान', 'तर्कशक्ति', 'गणित'] },
  { id: 'reet-level-2-set-1', slug: 'reet-level-2-set-1', title: 'REET Level II Practice Set', category: 'REET', duration: 20, totalQuestions: 10, difficulty: 'Medium', level: 'Level II', status: 'Live', attempts: 720, price: 0, description: 'REET अभ्यर्थियों के लिए राजस्थान और शिक्षण अभिरुचि का अभ्यास।', icon: '📚', highlights: ['REET स्तर के प्रश्न', 'हिंदी में अभ्यास', 'विस्तृत उत्तर समीक्षा'], syllabus: ['राजस्थान GK', 'शिक्षण विधियाँ', 'बाल विकास'] },
  { id: 'patwar-pyq-01', slug: 'patwar-pyq-01', title: 'Patwar Previous Paper 01', category: 'Patwar', duration: 20, totalQuestions: 10, difficulty: 'Medium', level: 'PYQ Practice', status: 'Live', attempts: 518, price: 0, description: 'पटवारी भर्ती की तैयारी के लिए चयनित पुराने प्रश्नों का अभ्यास।', icon: '🗺️', highlights: ['PYQ आधारित', 'टाइमर के साथ अभ्यास', 'तुरंत परिणाम'], syllabus: ['राजस्थान भूगोल', 'सामान्य ज्ञान', 'तर्कशक्ति'] },
  { id: 'rajasthan-police-mock', slug: 'rajasthan-police-mock', title: 'Rajasthan Police Constable Mock', category: 'Police', duration: 20, totalQuestions: 10, difficulty: 'Medium', level: 'Constable', status: 'Live', attempts: 406, price: 0, description: 'राजस्थान पुलिस भर्ती के सामान्य ज्ञान भाग के लिए timed mock test।', icon: '🛡️', highlights: ['भर्ती परीक्षा पैटर्न', 'हिंदी प्रश्न', 'स्कोर विश्लेषण'], syllabus: ['राजस्थान GK', 'इतिहास', 'संविधान'] },
];

const rajasthanQuestions: Question[] = [
  { id: 'q1', text: 'Which city is the capital of Rajasthan?', hindiText: 'राजस्थान की राजधानी कौन-सा शहर है?', options: ['जयपुर', 'जोधपुर', 'उदयपुर', 'बीकानेर'], correctIndex: 0, explanation: 'जयपुर राजस्थान की राजधानी है।', difficulty: 'Easy' },
  { id: 'q2', text: 'Keoladeo National Park is located in which district?', hindiText: 'केवलादेव राष्ट्रीय उद्यान किस जिले में स्थित है?', options: ['भरतपुर', 'अलवर', 'कोटा', 'जैसलमेर'], correctIndex: 0, explanation: 'केवलादेव राष्ट्रीय उद्यान राजस्थान के भरतपुर जिले में है।', difficulty: 'Easy' },
  { id: 'q3', text: 'Sambhar Lake is best known as India’s largest what?', hindiText: 'सांभर झील भारत की सबसे बड़ी कौन-सी झील मानी जाती है?', options: ['अंतर्देशीय खारे पानी की झील', 'मीठे पानी की झील', 'कृत्रिम झील', 'ग्लेशियल झील'], correctIndex: 0, explanation: 'सांभर झील भारत की सबसे बड़ी अंतर्देशीय खारे पानी की झील है।', difficulty: 'Medium' },
  { id: 'q4', text: 'Who commissioned the fort of Kumbhalgarh?', hindiText: 'कुंभलगढ़ दुर्ग का निर्माण किस शासक ने करवाया था?', options: ['महाराणा कुंभा', 'महाराणा प्रताप', 'राणा सांगा', 'राव जोधा'], correctIndex: 0, explanation: 'मेवाड़ के शासक महाराणा कुंभा ने कुंभलगढ़ दुर्ग का निर्माण करवाया था।', difficulty: 'Easy' },
  { id: 'q5', text: 'Kalibangan, an archaeological site of the Indus Valley Civilization, is in which district?', hindiText: 'सिंधु घाटी सभ्यता का पुरातात्विक स्थल कालीबंगा किस जिले में है?', options: ['हनुमानगढ़', 'श्रीगंगानगर', 'चूरू', 'नागौर'], correctIndex: 0, explanation: 'कालीबंगा राजस्थान के हनुमानगढ़ जिले में स्थित है।', difficulty: 'Medium' },
  { id: 'q6', text: 'What is the highest peak of the Aravalli Range?', hindiText: 'अरावली पर्वतमाला की सबसे ऊँची चोटी कौन-सी है?', options: ['गुरु शिखर', 'सेर', 'अचलगढ़', 'रघुनाथगढ़'], correctIndex: 0, explanation: 'माउंट आबू के पास स्थित गुरु शिखर अरावली पर्वतमाला की सबसे ऊँची चोटी है।', difficulty: 'Easy' },
  { id: 'q7', text: 'Which ruler founded Bikaner?', hindiText: 'बीकानेर नगर की स्थापना किसने की थी?', options: ['राव बीका', 'राव जोधा', 'राव मालदेव', 'राणा कुंभा'], correctIndex: 0, explanation: 'राव बीका ने 1488 ई. में बीकानेर की स्थापना की थी।', difficulty: 'Easy' },
  { id: 'q8', text: 'The famous Ghoomar folk dance belongs to which state?', hindiText: 'प्रसिद्ध घूमर लोकनृत्य किस राज्य से संबंधित है?', options: ['राजस्थान', 'गुजरात', 'पंजाब', 'मध्य प्रदेश'], correctIndex: 0, explanation: 'घूमर राजस्थान का प्रसिद्ध पारंपरिक लोकनृत्य है।', difficulty: 'Easy' },
  { id: 'q9', text: 'Which city is known as the Blue City of Rajasthan?', hindiText: 'राजस्थान का नीला शहर किसे कहा जाता है?', options: ['जोधपुर', 'जयपुर', 'कोटा', 'अजमेर'], correctIndex: 0, explanation: 'जोधपुर के पुराने शहर के नीले रंग से रंगे घरों के कारण इसे नीला शहर कहा जाता है।', difficulty: 'Easy' },
  { id: 'q10', text: 'Where is the Desert National Park primarily located?', hindiText: 'मरुस्थल राष्ट्रीय उद्यान मुख्य रूप से किन जिलों में फैला है?', options: ['जैसलमेर और बाड़मेर', 'जयपुर और दौसा', 'कोटा और बूंदी', 'भरतपुर और धौलपुर'], correctIndex: 0, explanation: 'मरुस्थल राष्ट्रीय उद्यान मुख्यतः जैसलमेर और बाड़मेर जिलों में फैला है।', difficulty: 'Medium' },
];

const seedLeaderboardEntries = [
  { rank: '01', name: 'TharExplorer', score: '82%', color: 'bg-amber-100 text-amber-800' },
  { rank: '02', name: 'MewarLearner', score: '64%', color: 'bg-slate-100 text-slate-700' },
  { rank: '03', name: 'AravalliAce', score: '63%', color: 'bg-orange-100 text-orange-800' },
  { rank: '04', name: 'JaipurScholar', score: '60%', color: 'bg-white text-slate-700' },
  { rank: '05', name: 'MarwarPrep', score: '55%', color: 'bg-white text-slate-700' },
  { rank: '06', name: 'DesertAspirant', score: '42%', color: 'bg-white text-slate-700' },
  { rank: '07', name: 'PinkCityLearner', score: '38%', color: 'bg-white text-slate-700' },
  { rank: '08', name: 'BikanerBooks', score: '33%', color: 'bg-white text-slate-700' },
  { rank: '09', name: 'HadautiPrep', score: '29%', color: 'bg-white text-slate-700' },
  { rank: '10', name: 'ShekhawatiStudy', score: '28%', color: 'bg-white text-slate-700' },
];

const seedDashboardResults: StudentResult[] = [
  { id: 'r1', examId: 'rajtest-pyq-12', title: 'RajTest PYQ #12', score: 8, total: 10, rank: 18, date: '2026-10-27', percentile: 91 },
  { id: 'r2', examId: 'daily-rajasthan-gk', title: 'आज का राजस्थान GK', score: 7, total: 10, rank: 72, date: '2026-10-25', percentile: 68 },
  { id: 'r3', examId: 'cet-graduate-pyq', title: 'CET Graduation PYQ Set', score: 6, total: 10, rank: 61, date: '2026-10-22', percentile: 63 },
];

const seedAdminStats = [
  { label: 'Active papers', value: '411', change: '+12%' },
  { label: 'Students', value: '1,888', change: '+18%' },
  { label: 'Test attempts', value: '30.4K', change: '+7%' },
  { label: 'Average score', value: '62%', change: '+4%' },
];

const seedAdminRecentExams = [
  { title: 'RajTest PYQ #12', students: '1,840', completion: '82%' },
  { title: 'आज का राजस्थान GK', students: '1,240', completion: '71%' },
  { title: 'CET Graduation PYQ', students: '980', completion: '63%' },
];

const seedData: SiteData = {
  examCategories: seedCategories,
  homepageTests: seedHomepageTests,
  exams: seedExams,
  examQuestions: Object.fromEntries(seedExams.map((exam) => [exam.slug, rajasthanQuestions])),
  leaderboardEntries: seedLeaderboardEntries,
  dashboardResults: seedDashboardResults,
  adminStats: seedAdminStats,
  adminRecentExams: seedAdminRecentExams,
};

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getSiteData(): SiteData {
  if (typeof window === 'undefined') {
    return cloneData(seedData);
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return cloneData(seedData);
  }

  try {
    const parsed = JSON.parse(saved) as Partial<SiteData>;
    return {
      examCategories: parsed.examCategories ?? seedData.examCategories,
      homepageTests: parsed.homepageTests ?? seedData.homepageTests,
      exams: parsed.exams ?? seedData.exams,
      examQuestions: parsed.examQuestions ?? seedData.examQuestions,
      leaderboardEntries: parsed.leaderboardEntries ?? seedData.leaderboardEntries,
      dashboardResults: parsed.dashboardResults ?? seedData.dashboardResults,
      adminStats: parsed.adminStats ?? seedData.adminStats,
      adminRecentExams: parsed.adminRecentExams ?? seedData.adminRecentExams,
    };
  } catch {
    return cloneData(seedData);
  }
}

export function saveSiteData(data: SiteData) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addExamToSiteData(exam: Partial<Exam>, questions: Question[] = []) {
  const current = getSiteData();
  const safeExam: Exam = {
    id: exam.id || `custom-${Date.now()}`,
    slug: exam.slug || (exam.title || 'new-exam').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title: exam.title || 'New exam',
    category: exam.category || 'General',
    duration: exam.duration || 15,
    totalQuestions: exam.totalQuestions || questions.length || 10,
    difficulty: exam.difficulty || 'Medium',
    level: exam.level || 'Practice',
    status: exam.status || 'Live',
    attempts: exam.attempts || 0,
    price: exam.price || 0,
    description: exam.description || 'Practice paper created in admin.',
    icon: exam.icon || '📝',
    highlights: exam.highlights || ['Live practice', 'Instant results', 'Content review'],
    syllabus: exam.syllabus || [exam.category || 'General'],
  };

  const existing = current.exams.find((item) => item.id === safeExam.id || item.slug === safeExam.slug);
  const nextExams = existing ? current.exams.map((item) => (item.id === safeExam.id || item.slug === safeExam.slug ? safeExam : item)) : [safeExam, ...current.exams];

  const nextQuestions = {
    ...current.examQuestions,
    [safeExam.slug]: questions.length ? questions : rajasthanQuestions.slice(0, Math.min(safeExam.totalQuestions, rajasthanQuestions.length)),
  };

  const categorySlug = safeExam.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const nextCategories = current.examCategories.some((item) => item.slug === categorySlug)
    ? current.examCategories
    : [...current.examCategories, { slug: categorySlug, title: safeExam.category, description: `${safeExam.category} practice tests`, icon: safeExam.icon }];

  const nextHomepageTests = [
    {
      id: safeExam.id,
      slug: safeExam.slug,
      title: safeExam.title,
      subject: safeExam.category,
      examTags: [safeExam.category],
      publishedAt: 'Just now',
      questionCount: safeExam.totalQuestions,
      duration: safeExam.duration,
      marks: safeExam.totalQuestions,
      attempts: safeExam.attempts,
      difficulty: safeExam.difficulty,
      isNew: true,
    },
    ...current.homepageTests.filter((item) => item.slug !== safeExam.slug && item.id !== safeExam.id),
  ];

  const nextAdminStats = [
    { label: 'Active papers', value: String(nextExams.length), change: '+12%' },
    { label: 'Students', value: '1,888', change: '+18%' },
    { label: 'Test attempts', value: `${(nextExams.reduce((sum, item) => sum + item.attempts, 0) / 1000).toFixed(1)}K`, change: '+7%' },
    { label: 'Average score', value: '62%', change: '+4%' },
  ];

  const nextAdminRecentExams = [{ title: safeExam.title, students: String(safeExam.attempts), completion: 'New' }, ...current.adminRecentExams].slice(0, 3);

  const nextData: SiteData = {
    ...current,
    examCategories: nextCategories,
    exams: nextExams,
    homepageTests: nextHomepageTests,
    examQuestions: nextQuestions,
    adminStats: nextAdminStats,
    adminRecentExams: nextAdminRecentExams,
  };

  saveSiteData(nextData);
  return nextData;
}

export function resetSiteData() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export const examCategories = seedData.examCategories;
export const homepageTests = seedData.homepageTests;
export const exams = seedData.exams;
export const examQuestions = seedData.examQuestions;
export const leaderboardEntries = seedData.leaderboardEntries;
export const dashboardResults = seedData.dashboardResults;
export const adminStats = seedData.adminStats;
export const adminRecentExams = seedData.adminRecentExams;

export function getHomepageTestGroups(data: SiteData = getSiteData()) {
  return [
    { title: 'New Tests', count: data.homepageTests.filter((test) => test.isNew).length, isNew: true, slugs: data.homepageTests.filter((test) => test.isNew).map((test) => test.slug) },
    { title: 'Rajasthan GK', count: data.homepageTests.filter((test) => test.subject === 'Rajasthan GK').length, slugs: data.homepageTests.filter((test) => test.subject === 'Rajasthan GK').map((test) => test.slug) },
    { title: 'General English', count: data.homepageTests.filter((test) => test.subject === 'General English').length, slugs: data.homepageTests.filter((test) => test.subject === 'General English').map((test) => test.slug) },
    { title: 'Current Affairs', count: data.homepageTests.filter((test) => test.subject === 'Current Affairs').length, slugs: data.homepageTests.filter((test) => test.subject === 'Current Affairs').map((test) => test.slug) },
    { title: 'General Awareness', count: data.homepageTests.filter((test) => test.subject === 'General Awareness').length, slugs: data.homepageTests.filter((test) => test.subject === 'General Awareness').map((test) => test.slug) },
    { title: 'Maths', count: data.homepageTests.filter((test) => test.subject === 'Maths').length, slugs: data.homepageTests.filter((test) => test.subject === 'Maths').map((test) => test.slug) },
    { title: 'General Science', count: data.homepageTests.filter((test) => test.subject === 'General Science').length, slugs: data.homepageTests.filter((test) => test.subject === 'General Science').map((test) => test.slug) },
  ];
}

export const homepageTestGroups = getHomepageTestGroups();
