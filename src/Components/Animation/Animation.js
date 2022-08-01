import React from "react";
import "./Animation.css";

function Animation() {
  return (
    <div className="slide-in-width">
      <div className="slide-in">
        <span style={{ color: "aliceblue" }}>90 min delivery time.</span> &nbsp;
        <span style={{ color: "darkturquoise" }}>
          Order timing 10AM to 10PM.
        </span>
        &nbsp;
        <span style={{ color: "antiquewhite" }}>
          Free delivery on order above 500/- only.
        </span>
        &nbsp;
        <span style={{ color: "aquamarine" }}>
          Now buy medicines from your local medical stores.
        </span>
      </div>
    </div>
  );
}

export default Animation;
