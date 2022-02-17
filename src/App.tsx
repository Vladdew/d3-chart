import React, { useEffect, useRef } from "react";
import "./App.scss";

import useWindowDimensions from "./hooks/useWindowDimensions";
import { data } from "./data";

import { scene } from "./scene";

const App = () => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      scene({ ref3: ref.current, data });
    }
  });

  return (
    <div className="svg">
      <svg
        id="container3"
        className="container3"
        ref={ref}
        width={width}
        height={height * 0.99}
      ></svg>
    </div>
  );
};

export default App;
