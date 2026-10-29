import { examQuestions, type Exam, type Question } from './mock-data';

export function getExamBySlug(slug: string): Exam | undefined {
  return require('./mock-data').exams.find((exam: Exam) => exam.slug === slug);
}

export function getQuestionsForExam(slug: string): Question[] {
  return examQuestions[slug] || [];
}

export function validateSubmission(payload: any) {
  if (!payload || typeof payload !== 'object') return { ok: false, error: 'Invalid payload.' };
  if (!payload.examId || typeof payload.examId !== 'string') return { ok: false, error: 'Exam id is required.' };
  if (!payload.answers || typeof payload.answers !== 'object') return { ok: false, error: 'Answers are required.' };
  if (!payload.studentId || typeof payload.studentId !== 'string') return { ok: false, error: 'Student id is required.' };

  return { ok: true };
}

export function calculateScore(questions: Question[], answers: Record<string, number | string | null>) {
  let correct = 0;
  let attempted = 0;

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer !== undefined && answer !== null && answer !== '') {
      attempted += 1;
      if (Number(answer) === question.correctIndex) {
        correct += 1;
      }
    }
  });

  const score = Math.round((correct / questions.length) * 100);

  return { attempted, correct, score };
}
