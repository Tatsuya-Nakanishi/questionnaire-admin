import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const admins = await prisma.admins.findMany();
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
