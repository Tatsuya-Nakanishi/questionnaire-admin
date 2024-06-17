import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const answers = await prisma.answers.findMany({
      include: {
        questionnaire: {
          include: {
            genre: true,
            questions: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const result = answers.map((a) => ({
      id: a.id,
      questionnaireTitle: a.questionnaire.title,
      genreName: a.questionnaire.genre.genre_name,
      numberOfQuestions: a.questionnaire.questions.length,
      createdAt: a.created_at,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
