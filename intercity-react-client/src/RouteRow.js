import React from "react";
import "./RouteRow.css";

function RouteRow({ departureTime, arrivalTime, standardPrice }) {
  return (
    <div className="routeRow">
      <div className="routeRow__timeInfo">
        <div className="routeRow__fareTime">
          <h2>{departureTime}</h2>
          <p>DEPARTURES</p>
        </div>
        <div className="routeRow__tripLine" />
        <div className="routeRow__tripInfo">
          <p>Direct Service</p>
          <p>1h 30m</p>
        </div>
        <div className="routeRow__tripLine" />
        <div className="routeRow__fareTime">
          <h2>{arrivalTime}</h2>
          <p>ARRIVES</p>
        </div>
      </div>
      <div className="routeRow__price">
        <p>From</p>
        <h2>${standardPrice}.00</h2>
      </div>
    </div>
  );
}

export default RouteRow;
