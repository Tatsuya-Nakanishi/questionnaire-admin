"use client";
import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AnswerType } from "@/types/types";
import { format } from "date-fns";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type PropType = {
  answers: AnswerType[];
  isDisplayAnswersLink?: boolean;
};

export default function Component({
  answers,
  isDisplayAnswersLink = false,
}: PropType) {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">アンケート</TableCell>
            <TableCell align="center">ジャンル</TableCell>
            <TableCell align="center">質問の数</TableCell>
            <TableCell align="center">回答日</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers.map((answer) => (
            <TableRow key={answer.id}>
              <TableCell align="center">{answer.questionnaireTitle}</TableCell>
              <TableCell align="center">{answer.genreName}</TableCell>
              <TableCell align="center">{answer.numberOfQuestions}</TableCell>
              <TableCell align="center">
                {format(new Date(answer.createdAt), "yyyy年MM月dd日")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDisplayAnswersLink && (
        <Link
          color="primary"
          href="/answers"
          onClick={preventDefault}
          sx={{ mt: 5 }}
        >
          もっと見る
        </Link>
      )}
    </React.Fragment>
  );
}
