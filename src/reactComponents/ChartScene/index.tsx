import React, { useEffect, useRef } from "react";
import { data } from "../../data";
import { scene } from "../../d3components/scene";
import "./chartscene.scss";

const ChartScene = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      scene({ ref: ref.current, data });
    }
  });

  return (
    <div className="chartscene">
      <div className="chartscene__white-space"></div>
      <svg
        className="chartscene__scene"
        ref={ref}
        width={1000}
        height={500}
      ></svg>
    </div>
  );
};

export default ChartScene;
