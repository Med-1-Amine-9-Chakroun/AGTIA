import React from "react";
import TopCardsComponent from "./TopCardsComponent";
import ChartsComponent from "./ChartsComponent";
import { useSelector } from "react-redux";
export default function DashboardComponent() {
  const state = useSelector((state) => state.user.value);
  console.log(state);
  return (
    <div>
      <TopCardsComponent />
      <ChartsComponent />
    </div>
  );
}
