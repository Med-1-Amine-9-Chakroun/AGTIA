import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./styles/barchart.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BarChartComponent() {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Tasks by Priority",
      horizontalAlign: "left",
      fontSize: 20,
      padding: {
        top: 10,
        left: 10,
        bottom: 20,
      },
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: [
          { label: "Very Low", y: 68 },
          { label: "Low", y: 38 },
          { label: "Medium", y: 92, indexLabel: "Highest" },
          { label: "High", y: 54 },
          { label: "Very High", y: 60 },
        ],
      },
    ],
    creditText: "", // Remove the text "canvasjs.com"
  };
  return (
    <div className="bar-chart">
      <CanvasJSChart options={options} />
    </div>
  );
}
