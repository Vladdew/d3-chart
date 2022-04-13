import * as d3 from "d3";
import { popperTooltip } from "../shared/popperTooltip";
import { renderBarPolygons } from "../d3components/renderBarPolygons";

export function barsAndItemsMouseover(
  this: any,
  sceneSVG: d3.Selection<SVGGElement, unknown, null, undefined>,
  clrTimeout: (() => void) | null
) {
  d3.selectAll(".percent-xaxis").style("display", "none");
  d3.selectAll(".bar").style("opacity", 0.2);
  d3.selectAll(".legend-list__item").style("opacity", 0.2);
  if (clrTimeout) clrTimeout();

  let barClassName = this.className.baseVal;
  if (barClassName) {
    if (barClassName.includes("bar-customer")) {
      d3.select(".legend-list__noncustomers-segments").style("opacity", 0.2);
    }

    if (barClassName.includes("bar-noncustomer")) {
      d3.select(".legend-list__customers-segments").style("opacity", 0.2);
    }

    barClassName = `.${barClassName.split(" ")[1]}`;
  }

  let checkMarkClassName = (this as any).className;
  if (typeof checkMarkClassName === "string") {
    checkMarkClassName = `.${checkMarkClassName.split(" ")[1].slice(0, -5)}`;
    popperTooltip("show", this, checkMarkClassName);
  }

  if (barClassName) {
    d3.selectAll(barClassName).style("opacity", 1);
    d3.selectAll(barClassName + "-item").style("opacity", 1);
    renderBarPolygons({
      className: barClassName,
      scene: sceneSVG,
    });

    const cur = (d3.select(this) as any)._groups[0][0].children[0];
    const attrX = +d3.select(cur).attr("x");
    const attrHalfWidth = +d3.select(cur).attr("width") / 2;

    d3.select(this)
      .append("span")
      .attr("class", "tooltip")
      .append("text")
      .attr("x", `${attrX + attrHalfWidth}`)
      .attr("class", "tooltip-text")
      .text(`${barClassName.slice(1, 10)}`);
  }

  if (typeof checkMarkClassName === "string") {
    d3.selectAll(checkMarkClassName).style("opacity", 1);
    d3.selectAll(checkMarkClassName + "-item").style("opacity", 1);
    renderBarPolygons({
      className: checkMarkClassName,
      scene: sceneSVG,
    });
  }
}
