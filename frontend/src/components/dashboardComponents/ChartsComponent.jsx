import React from "react";

import "./styles/charts.css";

import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import OverdueTasksComponent from "./OverdueTasksComponent";

export default function ChartsComponent() {
  return (
    <div className="charts-container">
      <div className="top-charts">
        <LineChartComponent />
        <BarChartComponent />
      </div>
      <div className="bottom-charts">
        <PieChartComponent />
        <OverdueTasksComponent />
      </div>
    </div>
  );
}
