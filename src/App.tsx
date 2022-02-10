import React, { useEffect, useRef } from "react";
import "./App.scss";

import useWindowDimensions from "./hooks/useWindowDimensions";

import { graph } from "./graph";

interface IProps {}

const App = () => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);
  const data = [14, 25, 34];
  useEffect(() => {
    console.log(ref);
    if (ref.current) {
      graph({ ref: ref.current, height, width, data });
    }
    // Обновляем заголовок документа с помощью API браузера
  });

  return (
    <div className="svg">
      <svg className="container" ref={ref} width={width} height={height}></svg>
    </div>
  );
};

export default App;
