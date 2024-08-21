import React from "react";
import "./styles/topcards.css";

import ChartsComponent from "./ChartsComponent";

export default function TopCardsComponent() {
  return (
    <div className="container">
      <div className="cards-container">
        {/* Total Tasks */}
        <div className="card">
          <div className="top-card">Total Tasks</div>
          <div className="bottom-card">450</div>
        </div>

        {/* Completed Tasks */}

        <div className="card">
          <div className="top-card">Completed Tasks</div>
          <div className="bottom-card">120</div>
        </div>

        {/* Pending Tasks */}

        <div className="card">
          <div className="top-card">Pending Tasks</div>

          <div className="bottom-card">450</div>
        </div>

        {/* Overdue Tasks */}

        <div className="card">
          <div className="top-card">Overdue Tasks</div>
          <div className="bottom-card">50</div>
        </div>
      </div>
      <ChartsComponent />
    </div>
  );
}
