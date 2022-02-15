import React, { useEffect, useRef } from "react";
import "./App.scss";

import useWindowDimensions from "./hooks/useWindowDimensions";

import { graph } from "./graph";
import { graph2 } from "./graph2";
// import { StackedBarChart } from "./StackedBarChart";
interface IProps {}

const App = () => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const data = [14, 25, 34];
  useEffect(() => {
    if (ref.current) {
      graph({ ref: ref.current, height, width, data });
      // StackedBarChart();
    }

    if (ref2.current) {
      graph2({ ref2: ref2.current });
    }
  });

  return (
    <div className="svg">
      <svg className="container" ref={ref} width={width} height={height}></svg>
      <svg
        id="container2"
        className="container2"
        ref={ref2}
        width={width}
        height={height}
      ></svg>
    </div>
  );
};

export default App;
