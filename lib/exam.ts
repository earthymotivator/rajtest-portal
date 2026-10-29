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

export const examCategories = [
  { slug: 'ssc', title: 'SSC', description: 'Staff Selection Commission', icon: '🏛️' },
  { slug: 'banking', title: 'Banking', description: 'IBPS, SBI, RBI', icon: '🏦' },
  { slug: 'railway', title: 'Railway', description: 'RRB, NTPC, ALP', icon: '🚆' },
  { slug: 'defence', title: 'Defence', description: 'NDA, CDS, CAPF', icon: '🛡️' },
  { slug: 'teaching', title: 'Teaching', description: 'CTET, TET, BSTC', icon: '📚' },
  { slug: 'state', title: 'State Exams', description: 'UPPSC, MPPSC', icon: '🧭' },
];

export const exams: Exam[] = [
  {
    id: 'ssc-cgl-practice',
    slug: 'ssc-cgl-practice',
    title: 'SSC CGL Full Mock Test',
    category: 'SSC',
    duration: 120,
    totalQuestions: 100,
    difficulty: 'Medium',
    level: 'Tier 1',
    status: 'Live',
    attempts: 1240,
    price: 299,
    description: 'Practice with exam-style questions and analytics across Quant, Reasoning, and English.',
    icon: '🧠',
    highlights: ['Full syllabus coverage', 'Detailed analytics', 'AI-based review'],
    syllabus: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness'],
  },
  {
    id: 'bank-po-rapid',
    slug: 'bank-po-rapid',
    title: 'Bank PO Rapid Test',
    category: 'Banking',
    duration: 90,
    totalQuestions: 75,
    difficulty: 'Hard',
    level: 'Prelims',
    status: 'Live',
    attempts: 890,
    price: 249,
    description: 'High-intensity banking practice designed to sharpen speed and accuracy.',
    icon: '🏦',
    highlights: ['Speed drills', 'Exam-like distractors', 'Sectional timing'],
    syllabus: ['Reasoning', 'Quant', 'English', 'Banking Awareness'],
  },
  {
    id: 'rrb-ntpc-benchmark',
    slug: 'rrb-ntpc-benchmark',
    title: 'RRB NTPC Benchmark',
    category: 'Railway',
    duration: 110,
    totalQuestions: 80,
    difficulty: 'Medium',
    level: 'Computer Based',
    status: 'Upcoming',
    attempts: 445,
    price: 199,
    description: 'Designed for railway aspirants with exam-like coverage of general topics and aptitude.',
    icon: '🚆',
    highlights: ['Current affairs', 'General Intelligence', 'Mock timing'],
    syllabus: ['Mathematics', 'Reasoning', 'G.K.', 'General Science'],
  },
  {
    id: 'upsc-prep',
    slug: 'upsc-prep',
    title: 'UPSC Foundation Test',
    category: 'State',
    duration: 150,
    totalQuestions: 120,
    difficulty: 'Hard',
    level: 'Prelims',
    status: 'Live',
    attempts: 620,
    price: 399,
    description: 'Covers foundational concepts and high-weight questions for civil service prep.',
    icon: '🧭',
    highlights: ['Higher-order thinking', 'Analysis review', 'Comprehensive coverage'],
    syllabus: ['Polity', 'History', 'Geography', 'Economy'],
  },
];

export const examQuestions: Record<string, Question[]> = {
  'ssc-cgl-practice': [
    {
      id: 'q1',
      text: 'A train leaves station A at 8:00 AM and reaches station B at 11:30 AM. If the distance is 210 km, what is the average speed of the train?',
      hindiText: 'एक ट्रेन स्टेशन A से 8:00 AM पर निकलती है और 11:30 AM पर स्टेशन B पहुँचती है। यदि दूरी 210 किमी है, तो ट्रेन की औसत गति क्या है?',
      options: ['60 km/h', '70 km/h', '75 km/h', '80 km/h'],
      correctIndex: 1,
      explanation: 'Time difference = 3.5 hours. Average speed = 210 / 3.5 = 60 km/h.',
      difficulty: 'Easy',
    },
    {
      id: 'q2',
      text: 'Which of the following is the synonym of “Candid”?',
      hindiText: 'निम्नलिखित में से “Candid” का समानार्थी शब्द क्या है?',
      options: ['Secretive', 'Frank', 'Formal', 'Dim'],
      correctIndex: 1,
      explanation: 'Candid means honest and straightforward, which matches Frank.',
      difficulty: 'Easy',
    },
    {
      id: 'q3',
      text: 'If the ratio of two numbers is 3:5 and their sum is 64, what is the larger number?',
      hindiText: 'यदि दो संख्याओं का अनुपात 3:5 है और उनका योग 64 है, तो बड़ी संख्या क्या है?',
      options: ['24', '32', '40', '48'],
      correctIndex: 2,
      explanation: 'Total parts = 8, each part = 8, larger = 5 × 8 = 40.',
      difficulty: 'Medium',
    },
    {
      id: 'q4',
      text: 'The capital of India is:',
      hindiText: 'भारत की राजधानी है:',
      options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
      correctIndex: 1,
      explanation: 'New Delhi is the capital of India.',
      difficulty: 'Easy',
    },
    {
      id: 'q5',
      text: 'Choose the correct preposition: She is good ___ Mathematics.',
      hindiText: 'सही पूर्वसर्ग चुनें: She is good ___ Mathematics.',
      options: ['in', 'on', 'at', 'for'],
      correctIndex: 0,
      explanation: 'The correct preposition is “in”.',
      difficulty: 'Medium',
    },
  ],
};

export const dashboardResults: StudentResult[] = [
  { id: 'r1', examId: 'ssc-cgl-practice', title: 'SSC CGL Full Mock Test', score: 74, total: 100, rank: 18, date: '2026-10-12', percentile: 91 },
  { id: 'r2', examId: 'bank-po-rapid', title: 'Bank PO Rapid Test', score: 62, total: 75, rank: 72, date: '2026-09-18', percentile: 68 },
  { id: 'r3', examId: 'rrb-ntpc-benchmark', title: 'RRB NTPC Benchmark', score: 58, total: 80, rank: 61, date: '2026-08-23', percentile: 63 },
];

export const adminStats = [
  { label: 'Active tests', value: '128', change: '+12%' },
  { label: 'Registered students', value: '24.8K', change: '+18%' },
  { label: 'Attempted today', value: '4.3K', change: '+7%' },
  { label: 'Avg. score', value: '72%', change: '+4%' },
];

export const adminRecentExams = [
  { title: 'SSC CGL', students: '1,840', completion: '82%' },
  { title: 'Bank PO', students: '1,240', completion: '71%' },
  { title: 'RRB NTPC', students: '980', completion: '63%' },
];
