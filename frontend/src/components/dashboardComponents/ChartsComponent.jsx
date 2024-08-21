import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import LineChartComponent from "./LineChartComponent";
export default function ChartsComponent() {
  const pieChartData = [
    { id: 1, value: 40, label: "Completed" },
    { id: 2, value: 30, label: "Pending" },
    { id: 3, value: 20, label: "Overdue" },
  ];
  return (
    <div className="chart">
      <PieChart
        series={[
          {
            data: pieChartData.map((item) => ({
              ...item, // Spread the data item properties
              label: `${item.label} (${item.value}%)`, // Optional: Add a custom label with value
            })),

            innerRadius: 85,
            outerRadius: 125,
            paddingAngle: 0,
            cornerRadius: -1,
            startAngle: -180,
            endAngle: 180,
            cx: 130,
            cy: 150,
          },
        ]}
      />
      <LineChartComponent />
    </div>
  );
}
