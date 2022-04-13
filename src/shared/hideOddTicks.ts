import * as d3 from "d3";

export const hideOddTicks = () => {
  Array.from(document.querySelectorAll(".axis--x .tick text")).forEach(tick => {
    const value =
      tick.innerHTML[0] === "−"
        ? +tick.innerHTML.slice(1, -1)
        : +tick.innerHTML.slice(0, -1);

    value % 20 && d3.select(tick).style("display", "none");
  });
};
