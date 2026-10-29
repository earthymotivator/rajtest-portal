import { NextRequest, NextResponse } from 'next/server';
import { calculateScore, getQuestionsForExam, validateSubmission } from '@/lib/exam';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const validation = validateSubmission(payload);

    if (!validation.ok) {
      return NextResponse.json({ ok: false, error: validation.error }, { status: 400 });
    }

    const examSlug = payload.examId;
    const questions = getQuestionsForExam(examSlug);

    if (!questions.length) {
      return NextResponse.json({ ok: false, error: 'Exam not found.' }, { status: 404 });
    }

    const result = calculateScore(questions, payload.answers);
    const passMark = Math.ceil(questions.length * 0.4);

    return NextResponse.json({
      ok: true,
      examId: examSlug,
      studentId: payload.studentId,
      score: result.score,
      correct: result.correct,
      attempted: result.attempted,
      total: questions.length,
      status: result.correct >= passMark ? 'pass' : 'fail',
      submittedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unexpected server error.' }, { status: 500 });
  }
}
