import * as d3 from "d3";

export function segmentsMouseleave(
  this: any,
  defTimeout: (arg: Element) => void
) {
  defTimeout(this);

  d3.selectAll(".bar").style("opacity", 1);
  d3.selectAll(".legend-list__item").style("opacity", 1);
  d3.selectAll(".legend-list__segments").style("opacity", 1);

  if (d3.select(".percentage__label input").attr("aria-checked") !== "false") {
    d3.selectAll(".percent-xaxis").style("display", "inline");
  }

  d3.selectAll(".polygon1").remove();
  d3.selectAll(".polygon2").remove();
}
