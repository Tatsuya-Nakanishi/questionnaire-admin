"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AnswersCountByDateResultType } from "@/api/home/route";

type PropType = {
  answersCountByDate: AnswersCountByDateResultType[];
};

export default function Component({ answersCountByDate }: PropType) {
  return (
    <React.Fragment>
      <h3>過去1ヶ月の回答数</h3>
      <div style={{ width: "100%", height: "200px", flexGrow: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={answersCountByDate}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{
                value: "日付",
                dy: 20,
              }}
            />
            <YAxis
              label={{
                value: "回答数",
                angle: -90,
                dx: -20,
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="answerCount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}
