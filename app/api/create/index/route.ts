import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import humps from "humps";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const questionTypes = await prisma.question_types.findMany();
    const genres = await prisma.genres.findMany();
    const result = {
      questionTypes: humps.camelizeKeys(questionTypes),
      genres: humps.camelizeKeys(genres),
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
