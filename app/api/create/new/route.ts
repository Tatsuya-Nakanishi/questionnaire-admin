import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import humps from "humps";
import { QuestionForm } from "@/create/page";

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  console.log(data);
  console.log(req);
  console.log("testest");
  try {
    await prisma.$transaction(async (prisma) => {
      // アンケートを作成
      const questionnaire = await prisma.questionnaires.create({
        data: {
          title: data.title,
          genre_id: data.genre,
          is_public: false,
        },
      });

      // 質問を作成
      for (const question of data.questions) {
        const createdQuestion = await prisma.questions.create({
          data: {
            questionnaire_id: questionnaire.id,
            question_text: question.name,
            question_type_id: question.type,
            is_required: question.isRequired,
          },
        });

        // オプションを作成
        for (const option of question.options) {
          await prisma.question_options.create({
            data: {
              question_id: createdQuestion.id,
              option_text: option,
            },
          });
        }
      }
    });

    return NextResponse.json(true);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
