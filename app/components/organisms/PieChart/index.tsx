"use client";
// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Tooltip,
//   Cell,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Active", value: 195, color: "#FF0000" },
//   { name: "Recoveries", value: 23, color: "#008000" },
//   { name: "Deaths", value: 4, color: "#000000" },
// ];

// function CustomLegend() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         flexWrap: "wrap", // 追加: レジェンド項目が折り返すように
//         marginTop: 10,
//         marginBottom: 10,
//         padding: "0 5px", // 追加: パディングを調整
//       }}
//     >
//       {data.map((entry, index) => (
//         <div
//           key={index}
//           style={{
//             marginRight: 10,
//             display: "flex",
//             alignItems: "center",
//             fontSize: "0.85rem", // 追加: フォントサイズを小さく
//           }}
//         >
//           <div
//             style={{
//               width: 12,
//               height: 12,
//               backgroundColor: entry.color,
//               marginRight: 5,
//             }}
//           ></div>
//           {entry.name} {entry.value}
//         </div>
//       ))}
//     </div>
//   );
// }

// function PieChartComponent() {
//   return (
//     <div style={{ height: 400, padding: "20px", boxSizing: "border-box" }}>
//       <h3 style={{ textAlign: "right" }}>作成済みのアンケート　10件</h3>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={({ name, percent }) =>
//               `${name} ${(percent * 100).toFixed(0)}%`
//             }
//             outerRadius={100} // 半径を調整
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//       <CustomLegend />
//     </div>
//   );
// }

// export default PieChartComponent;

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = () => {
  const data = [
    { name: "仕事", value: 4 },
    { name: "恋愛", value: 3 },
    { name: "趣味", value: 2 },
    { name: "グルメ", value: 2 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  type CustomLabelProps = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  };
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: CustomLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div>
        <div className="col-md-8">
          <div style={{ textAlign: "right" }}>
            <p>作成済みのアンケート　10件</p>
            <a href="/">新規作成</a>
          </div>
          <ResponsiveContainer width={400} height={200} className="text-center">
            <PieChart width={400} height={200}>
              <Legend verticalAlign="bottom" />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
export default PieChartComponent;
