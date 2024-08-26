import React from "react";

import "./styles/piechart.css";

import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChartComponent() {
  const options = {
    animationEnabled: true,
    title: {
      text: "Tasks by Status",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontSize: 18,
      padding: {
        top: 10,
        left: 10,
        bottom: 20,
      },
    },
    // subtitles: [
    //   {
    //     text: "Completed",
    //     verticalAlign: "center",
    //     fontSize: 14,
    //     dockInsidePlotArea: true,
    //     padding: {
    //       bottom: 50,
    //     },
    //   },
    //   {
    //     text: "Pending",
    //     verticalAlign: "center",
    //     fontSize: 14,
    //     dockInsidePlotArea: true,
    //     padding: {
    //       bottom: 0,
    //     },
    //   },
    //   {
    //     text: "Overdue",
    //     verticalAlign: "center",
    //     fontSize: 14,
    //     dockInsidePlotArea: true,
    //     padding: {
    //       top: 50,
    //     },
    //   },
    // ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints: [
          { name: "Completed", y: 5 },
          { name: "Pending", y: 31 },

          { name: "Overdue", y: 17 },
        ],
      },
    ],
  };

  return (
    <div className="pie-chart">
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
