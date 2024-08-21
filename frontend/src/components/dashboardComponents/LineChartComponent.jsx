import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import "./styles/linechart.css";
import { LineChart } from "@mui/x-charts/LineChart";

// import { HighlightedCode } from "@mui/docs/HighlightedCode";

const lineChartsParams = {
  series: [
    {
      color: "#7994EB", // Line color
      areaColor: "rgba(154, 212, 241, 0.3)", // Area fill color
      id: "series-1",
      data: [3, 4, 1, 6, 5],
      label: "A",
      area: true,
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
    {
      color: "#9ED7F2", // Line color
      areaColor: "rgba(154, 212, 241, 0.3)", // Area fill color
      id: "series-2",
      data: [4, 3, 1, 5, 8],
      label: "B",
      area: true,
      stack: "total",
      highlightScope: {
        highlighted: "item",
      },
    },
  ],
  xAxis: [{ data: [0, 3, 6, 9, 12], scaleType: "linear", id: "axis1" }],
  height: 400,
};

export default function LineChartComponent() {
  const [itemData, setItemData] = React.useState();
  const [axisData, setAxisData] = React.useState();

  return (
    <div className="line-chart">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 0, md: 4 }}
        sx={{ width: "100%" }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <LineChart
            {...lineChartsParams}
            onAreaClick={(event, d) => setItemData(d)}
            onMarkClick={(event, d) => setItemData(d)}
            onLineClick={(event, d) => setItemData(d)}
            onAxisClick={(event, d) => setAxisData(d)}
          />
        </Box>
      </Stack>
    </div>
  );
}
