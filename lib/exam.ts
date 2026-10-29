import { examQuestions, exams, type Exam, type Question } from '@/lib/mock-data';

export function getExamBySlug(slug: string): Exam | undefined {
  return exams.find((exam) => exam.slug === slug || exam.id === slug);
}

export function getQuestionsForExam(slug: string): Question[] {
  return examQuestions[slug] || [];
}

export function validateSubmission(payload: unknown) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return { ok: false, error: 'Invalid payload.' };
  const submission = payload as Record<string, unknown>;
  if (typeof submission.examId !== 'string' || !submission.examId) return { ok: false, error: 'Exam id is required.' };
  if (!submission.answers || typeof submission.answers !== 'object' || Array.isArray(submission.answers)) return { ok: false, error: 'Answers are required.' };
  if (typeof submission.studentId !== 'string' || !submission.studentId) return { ok: false, error: 'Student id is required.' };
  return { ok: true as const };
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
