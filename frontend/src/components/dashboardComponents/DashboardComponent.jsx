import React from "react";
import TopCardsComponent from "./TopCardsComponent";
import ChartsComponent from "./ChartsComponent";
export default function DashboardComponent() {
  return (
    <div>
      <TopCardsComponent />
      <ChartsComponent />
    </div>
  );
}
