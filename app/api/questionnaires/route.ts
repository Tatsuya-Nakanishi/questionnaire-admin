import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const questionnaires = await prisma.questionnaires.findMany({
      include: {
        genre: true,
        answers: true,
      },
    });

    const result = questionnaires.map((q) => ({
      id: q.id,
      title: q.title,
      isPublic: q.is_public,
      genreName: q.genre.genre_name,
      answerCount: q.answers.length,
      createdAt: q.created_at,
      updatedAt: q.updated_at,
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
