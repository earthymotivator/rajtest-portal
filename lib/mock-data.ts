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
  { slug: 'rpsc', title: 'RPSC', description: 'RAS, School Lecturer, SI', icon: '🏛️' },
  { slug: 'cet', title: 'CET', description: 'Graduation और Senior Secondary', icon: '📝' },
  { slug: 'reet', title: 'REET', description: 'Level I और Level II', icon: '📚' },
  { slug: 'patwar', title: 'Patwar', description: 'राजस्थान पटवारी भर्ती', icon: '🗺️' },
  { slug: 'police', title: 'Police', description: 'Constable और SI भर्ती', icon: '🛡️' },
  { slug: 'rajasthan-gk', title: 'Rajasthan GK', description: 'इतिहास, भूगोल और संस्कृति', icon: '🌄' },
];

export const exams: Exam[] = [
  {
    id: 'rpsc-ras-practice',
    slug: 'rpsc-ras-practice',
    title: 'RPSC RAS Practice Set',
    category: 'RPSC',
    duration: 20,
    totalQuestions: 10,
    difficulty: 'Medium',
    level: 'Preliminary',
    status: 'Live',
    attempts: 652,
    price: 0,
    description: 'RPSC अभ्यर्थियों के लिए राजस्थान सामान्य ज्ञान का परीक्षा-स्तर अभ्यास।',
    icon: '🏛️',
    highlights: ['RAS परीक्षा पैटर्न', 'हिंदी में प्रश्न', 'तुरंत परिणाम'],
    syllabus: ['राजस्थान इतिहास', 'भूगोल', 'राजव्यवस्था'],
  },
  {
    id: 'rajtest-pyq-12',
    slug: 'rajtest-pyq-12',
    title: 'RajTest PYQ #12',
    category: 'Rajasthan GK',
    duration: 15,
    totalQuestions: 10,
    difficulty: 'Medium',
    level: 'सामान्य ज्ञान',
    status: 'Live',
    attempts: 30470,
    price: 0,
    description: 'राजस्थान इतिहास, भूगोल और कला-संस्कृति पर आधारित पिछली परीक्षाओं के प्रश्न।',
    icon: '🌄',
    highlights: ['10 वस्तुनिष्ठ प्रश्न', 'तुरंत स्कोर और उत्तर', 'हिंदी में अभ्यास'],
    syllabus: ['राजस्थान इतिहास', 'भूगोल', 'कला एवं संस्कृति', 'सामान्य ज्ञान'],
  },
  {
    id: 'daily-rajasthan-gk',
    slug: 'daily-rajasthan-gk',
    title: 'आज का राजस्थान GK',
    category: 'Rajasthan GK',
    duration: 15,
    totalQuestions: 10,
    difficulty: 'Easy',
    level: 'Daily Quiz',
    status: 'Live',
    attempts: 1888,
    price: 0,
    description: 'रोज़ाना अभ्यास के लिए राजस्थान सामान्य ज्ञान का छोटा timed quiz।',
    icon: '☀️',
    highlights: ['रोज़ नया सेट', 'हल सहित परिणाम', 'मोबाइल पर आसान अभ्यास'],
    syllabus: ['राजस्थान सामान्य ज्ञान', 'समसामयिकी'],
  },
  {
    id: 'cet-graduate-pyq',
    slug: 'cet-graduate-pyq',
    title: 'CET Graduation PYQ Set',
    category: 'CET',
    duration: 20,
    totalQuestions: 10,
    difficulty: 'Medium',
    level: 'Graduation Level',
    status: 'Live',
    attempts: 934,
    price: 0,
    description: 'CET पैटर्न पर राजस्थान GK और सामान्य योग्यता का अभ्यास सेट।',
    icon: '📝',
    highlights: ['परीक्षा पैटर्न आधारित', 'समयबद्ध अभ्यास', 'प्रयास के बाद समीक्षा'],
    syllabus: ['राजस्थान GK', 'सामान्य विज्ञान', 'तर्कशक्ति', 'गणित'],
  },
  {
    id: 'reet-level-2-set-1',
    slug: 'reet-level-2-set-1',
    title: 'REET Level II Practice Set',
    category: 'REET',
    duration: 20,
    totalQuestions: 10,
    difficulty: 'Medium',
    level: 'Level II',
    status: 'Live',
    attempts: 720,
    price: 0,
    description: 'REET अभ्यर्थियों के लिए राजस्थान और शिक्षण अभिरुचि का अभ्यास।',
    icon: '📚',
    highlights: ['REET स्तर के प्रश्न', 'हिंदी में अभ्यास', 'विस्तृत उत्तर समीक्षा'],
    syllabus: ['राजस्थान GK', 'शिक्षण विधियाँ', 'बाल विकास'],
  },
  {
    id: 'patwar-pyq-01',
    slug: 'patwar-pyq-01',
    title: 'Patwar Previous Paper 01',
    category: 'Patwar',
    duration: 20,
    totalQuestions: 10,
    difficulty: 'Medium',
    level: 'PYQ Practice',
    status: 'Live',
    attempts: 518,
    price: 0,
    description: 'पटवारी भर्ती की तैयारी के लिए चयनित पुराने प्रश्नों का अभ्यास।',
    icon: '🗺️',
    highlights: ['PYQ आधारित', 'टाइमर के साथ अभ्यास', 'तुरंत परिणाम'],
    syllabus: ['राजस्थान भूगोल', 'सामान्य ज्ञान', 'तर्कशक्ति'],
  },
  {
    id: 'rajasthan-police-mock',
    slug: 'rajasthan-police-mock',
    title: 'Rajasthan Police Constable Mock',
    category: 'Police',
    duration: 20,
    totalQuestions: 10,
    difficulty: 'Medium',
    level: 'Constable',
    status: 'Live',
    attempts: 406,
    price: 0,
    description: 'राजस्थान पुलिस भर्ती के सामान्य ज्ञान भाग के लिए timed mock test।',
    icon: '🛡️',
    highlights: ['भर्ती परीक्षा पैटर्न', 'हिंदी प्रश्न', 'स्कोर विश्लेषण'],
    syllabus: ['राजस्थान GK', 'इतिहास', 'संविधान'],
  },
];

const rajasthanQuestions: Question[] = [
    {
      id: 'q1',
      text: 'Which city is the capital of Rajasthan?',
      hindiText: 'राजस्थान की राजधानी कौन-सा शहर है?',
      options: ['जयपुर', 'जोधपुर', 'उदयपुर', 'बीकानेर'],
      correctIndex: 0,
      explanation: 'जयपुर राजस्थान की राजधानी है। इसकी स्थापना सवाई जयसिंह द्वितीय ने की थी।',
      difficulty: 'Easy',
    },
    {
      id: 'q2',
      text: 'Keoladeo National Park is located in which district?',
      hindiText: 'केवलादेव राष्ट्रीय उद्यान किस जिले में स्थित है?',
      options: ['भरतपुर', 'अलवर', 'कोटा', 'जैसलमेर'],
      correctIndex: 0,
      explanation: 'केवलादेव राष्ट्रीय उद्यान राजस्थान के भरतपुर जिले में है।',
      difficulty: 'Easy',
    },
    {
      id: 'q3',
      text: 'Sambhar Lake is best known as India’s largest what?',
      hindiText: 'सांभर झील भारत की सबसे बड़ी कौन-सी झील मानी जाती है?',
      options: ['अंतर्देशीय खारे पानी की झील', 'मीठे पानी की झील', 'कृत्रिम झील', 'ग्लेशियर झील'],
      correctIndex: 0,
      explanation: 'सांभर झील भारत की सबसे बड़ी अंतर्देशीय खारे पानी की झील है।',
      difficulty: 'Medium',
    },
    {
      id: 'q4',
      text: 'Who commissioned the fort of Kumbhalgarh?',
      hindiText: 'कुंभलगढ़ दुर्ग का निर्माण किस शासक ने करवाया था?',
      options: ['महाराणा कुंभा', 'महाराणा प्रताप', 'राणा सांगा', 'राव जोधा'],
      correctIndex: 0,
      explanation: 'मेवाड़ के शासक महाराणा कुंभा ने 15वीं शताब्दी में कुंभलगढ़ दुर्ग का निर्माण करवाया।',
      difficulty: 'Easy',
    },
    {
      id: 'q5',
      text: 'Kalibangan, an archaeological site of the Indus Valley Civilization, is in which district?',
      hindiText: 'सिंधु घाटी सभ्यता का पुरातात्विक स्थल कालीबंगा किस जिले में है?',
      options: ['हनुमानगढ़', 'श्रीगंगानगर', 'चूरू', 'नागौर'],
      correctIndex: 0,
      explanation: 'कालीबंगा राजस्थान के हनुमानगढ़ जिले में स्थित है।',
      difficulty: 'Medium',
    },
    {
      id: 'q6',
      text: 'What is the highest peak of the Aravalli Range?',
      hindiText: 'अरावली पर्वतमाला की सबसे ऊँची चोटी कौन-सी है?',
      options: ['गुरु शिखर', 'सेर', 'अचलगढ़', 'रघुनाथगढ़'],
      correctIndex: 0,
      explanation: 'माउंट आबू के पास स्थित गुरु शिखर अरावली पर्वतमाला की सबसे ऊँची चोटी है।',
      difficulty: 'Easy',
    },
    {
      id: 'q7',
      text: 'Which ruler founded Bikaner?',
      hindiText: 'बीकानेर नगर की स्थापना किसने की थी?',
      options: ['राव बीका', 'राव जोधा', 'राव मालदेव', 'राणा कुंभा'],
      correctIndex: 0,
      explanation: 'राव बीका ने 1488 ई. में बीकानेर नगर की स्थापना की थी।',
      difficulty: 'Easy',
    },
    {
      id: 'q8',
      text: 'The famous Ghoomar folk dance belongs to which state?',
      hindiText: 'प्रसिद्ध घूमर लोकनृत्य किस राज्य से संबंधित है?',
      options: ['राजस्थान', 'गुजरात', 'पंजाब', 'मध्य प्रदेश'],
      correctIndex: 0,
      explanation: 'घूमर राजस्थान का प्रसिद्ध पारंपरिक लोकनृत्य है।',
      difficulty: 'Easy',
    },
    {
      id: 'q9',
      text: 'Which city is known as the Blue City of Rajasthan?',
      hindiText: 'राजस्थान का नीला शहर किसे कहा जाता है?',
      options: ['जोधपुर', 'जयपुर', 'कोटा', 'अजमेर'],
      correctIndex: 0,
      explanation: 'जोधपुर के पुराने शहर के नीले रंग से रंगे घरों के कारण इसे नीला शहर कहा जाता है।',
      difficulty: 'Easy',
    },
    {
      id: 'q10',
      text: 'Where is the Desert National Park primarily located?',
      hindiText: 'मरुस्थल राष्ट्रीय उद्यान मुख्य रूप से किन जिलों में फैला है?',
      options: ['जैसलमेर और बाड़मेर', 'जयपुर और दौसा', 'कोटा और बूंदी', 'भरतपुर और धौलपुर'],
      correctIndex: 0,
      explanation: 'मरुस्थल राष्ट्रीय उद्यान मुख्यतः जैसलमेर और बाड़मेर जिलों में फैला है।',
      difficulty: 'Medium',
    },
];

export const examQuestions: Record<string, Question[]> = Object.fromEntries(
  exams.map((exam) => [exam.slug, rajasthanQuestions]),
);

export const dashboardResults: StudentResult[] = [
  { id: 'r1', examId: 'rajtest-pyq-12', title: 'RajTest PYQ #12', score: 8, total: 10, rank: 18, date: '2026-10-27', percentile: 91 },
  { id: 'r2', examId: 'daily-rajasthan-gk', title: 'आज का राजस्थान GK', score: 7, total: 10, rank: 72, date: '2026-10-25', percentile: 68 },
  { id: 'r3', examId: 'cet-graduate-pyq', title: 'CET Graduation PYQ Set', score: 6, total: 10, rank: 61, date: '2026-10-22', percentile: 63 },
];

export const leaderboardEntries = [
  { rank: '01', name: 'TharExplorer', score: '82%', color: 'bg-amber-100 text-amber-800' },
  { rank: '02', name: 'MewarLearner', score: '64%', color: 'bg-slate-100 text-slate-700' },
  { rank: '03', name: 'AravalliAce', score: '63%', color: 'bg-orange-100 text-orange-800' },
  { rank: '04', name: 'JaipurScholar', score: '60%', color: 'bg-white text-slate-700' },
  { rank: '05', name: 'MarwarPrep', score: '51%', color: 'bg-white text-slate-700' },
];

export const adminStats = [
  { label: 'Active papers', value: '411', change: '+12%' },
  { label: 'Students', value: '1,888', change: '+18%' },
  { label: 'Test attempts', value: '30.4K', change: '+7%' },
  { label: 'Average score', value: '62%', change: '+4%' },
];

export const adminRecentExams = [
  { title: 'RajTest PYQ #12', students: '1,840', completion: '82%' },
  { title: 'आज का राजस्थान GK', students: '1,240', completion: '71%' },
  { title: 'CET Graduation PYQ', students: '980', completion: '63%' },
];
