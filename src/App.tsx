import React, { useEffect, useRef } from "react";
import "./App.scss";

import useWindowDimensions from "./hooks/useWindowDimensions";

import { graph } from "./graph";
import { graph2 } from "./graph2";
import { graph3 } from "./graph3";
// import { StackedBarChart } from "./StackedBarChart";
interface IProps {}

const App = () => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    // if (ref.current) {
    //   graph({ ref: ref.current, height, width, data });
    //   // StackedBarChart();
    // }
    if (ref2.current) {
      graph2({ ref2: ref2.current });
    }

    if (ref3.current) {
      graph3({ ref3: ref3.current });
    }
  });

  return (
    <div className="svg">
      {/* <svg className="container" ref={ref} width={width} height={height}></svg> */}
      <svg
        id="container2"
        width={width}
        className="container2"
        ref={ref2}
      ></svg>
      <svg
        id="container3"
        className="container3"
        ref={ref3}
        width={width}
        height={height}
      ></svg>
    </div>
  );
};

export default App;
