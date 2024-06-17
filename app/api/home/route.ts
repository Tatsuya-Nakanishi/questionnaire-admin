import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export type RatioResultType = {
  genreName: string;
  ratio: number;
};

export type AnswersCountByDateResultType = {
  date: string;
  answerCount: bigint;
};

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
    const answersResult = answers.map((a) => ({
      id: a.id,
      questionnaireTitle: a.questionnaire.title,
      genreName: a.questionnaire.genre.genre_name,
      numberOfQuestions: a.questionnaire.questions.length,
      createdAt: a.created_at,
    }));
    const totalQuestionnaires = await prisma.questionnaires.count();
    const raioResult = await prisma.$queryRaw<
      { genrename: string; ratio: bigint }[]
    >`
      SELECT
        g.genre_name AS genrename,
        COUNT(q.id) / ${totalQuestionnaires} AS ratio
      FROM
        genres g
      INNER JOIN
        questionnaires q ON g.id = q.genre_id
      GROUP BY
        g.genre_name
      ORDER BY
       ratio DESC;
    `;

    const raioResultConverted = raioResult.map((item) => ({
      genreName: item.genrename,
      ratio: Number(item.ratio),
    }));

    const answersCountByDateResult = await prisma.$queryRaw<
      { date: string; answercount: bigint }[]
    >`
    WITH date_series AS (
      SELECT
        generate_series(CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE, '1 day'::interval) AS date
    )
    SELECT
      ds.date as date,
      COUNT(a.id) AS answercount
    FROM
      date_series ds
    LEFT JOIN
      answers a ON DATE(a.created_at) = ds.date
    GROUP BY
      ds.date
    ORDER BY
      ds.date;
  `;
    const answersCountByDateResultConverted = answersCountByDateResult.map(
      (item) => ({
        date: format(new Date(item.date), "MM/dd"),
        answerCount: Number(item.answercount),
      })
    );
    const result = {
      answers: answersResult,
      ratio: raioResultConverted,
      answersCountByDate: answersCountByDateResultConverted,
      totalQuestionnaires: totalQuestionnaires,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
