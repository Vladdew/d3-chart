import * as d3 from "d3";

interface Iprops {
  flag: "Customers" | "Non-customers";
  scene: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const renderSegmentsPolygons = ({ flag, scene }: Iprops): void => {
  let topRow,
    midRow,
    botRow,
    firstRect,
    topRowLastRect,
    midRowLastRect,
    botRowLastRect,
    firstRectX,
    topRowLastRectX: number,
    midRowLastRectX: number,
    botRowLastRectX: number,
    topRowLastRectWidth: number,
    midRowLastRectWidth: number,
    botRowLastRectWidth: number;

  const topY = -321;
  const middleTopY = -240;
  const middleBottomY = -190;
  const bottomY = -110;

  if (flag === "Customers") {
    topRow = document.querySelectorAll(".delta .bar-customer");
    midRow = document.querySelectorAll(".american_airlines .bar-customer");
    botRow = document.querySelectorAll(".southwest .bar-customer");

    firstRect = d3.select(topRow[0].children[0]);
    topRowLastRect = d3.select(topRow[1].children[0]);
    midRowLastRect = d3.select(midRow[1].children[0]);
    botRowLastRect = d3.select(botRow[1].children[0]);

    firstRectX = +firstRect.attr("x") + 2;
    topRowLastRectX = +topRowLastRect.attr("x") + 2;
    midRowLastRectX = +midRowLastRect.attr("x") + 2;
    botRowLastRectX = +botRowLastRect.attr("x") + 2;

    topRowLastRectWidth = +topRowLastRect.attr("width") - 2;
    midRowLastRectWidth = +midRowLastRect.attr("width") - 2;
    botRowLastRectWidth = +botRowLastRect.attr("width") - 2;
  }
  if (flag === "Non-customers") {
    topRow = document.querySelectorAll(".delta .bar-noncustomer");
    midRow = document.querySelectorAll(".american_airlines .bar-noncustomer");
    botRow = document.querySelectorAll(".southwest .bar-noncustomer");

    firstRect = d3.select(topRow[0].children[0]);
    topRowLastRect = d3.select(topRow[4].children[0]);
    midRowLastRect = d3.select(midRow[4].children[0]);
    botRowLastRect = d3.select(botRow[4].children[0]);

    firstRectX = +firstRect.attr("x") + 2;
    topRowLastRectX = +topRowLastRect.attr("x") + 2;
    midRowLastRectX = +midRowLastRect.attr("x") + 2;
    botRowLastRectX = +botRowLastRect.attr("x") + 2;

    const firstRectWidth = +firstRect.attr("width") - 2;

    topRowLastRectWidth = +topRowLastRect.attr("width") - 2;
    midRowLastRectWidth = +midRowLastRect.attr("width") - 2;
    botRowLastRectWidth = +botRowLastRect.attr("width") - 2;

    firstRectX += firstRectWidth;
    topRowLastRectX -= topRowLastRectWidth;
    midRowLastRectX -= midRowLastRectWidth;
    botRowLastRectX -= botRowLastRectWidth;
  }

  scene
    .append("polygon")
    .classed("polygon1", true)
    .attr(
      "points",
      ` ${topRowLastRectX! + topRowLastRectWidth!},${topY} ${
        midRowLastRectX! + midRowLastRectWidth!
      },${middleTopY} ${firstRectX},${middleTopY} ${firstRectX},${topY}`
    )
    .attr(
      "fill",
      flag === "Customers"
        ? "rgba(59, 195, 102,0.5)"
        : "rgba(251, 218, 104,0.5)"
    )
    .attr(
      "stroke",
      flag === "Customers" ? "rgb(59, 195, 102)" : "rgb(251, 218, 104)"
    );

  scene
    .append("polygon")
    .classed("polygon2", true)
    .attr(
      "points",
      ` ${midRowLastRectX! + midRowLastRectWidth!},${middleBottomY} ${
        botRowLastRectX! + botRowLastRectWidth!
      },${bottomY} ${firstRectX},${bottomY} ${firstRectX},${middleBottomY}`
    )
    .attr(
      "fill",
      flag === "Customers"
        ? "rgba(59, 195, 102,0.5)"
        : "rgba(251, 218, 104,0.5)"
    )
    .attr(
      "stroke",
      flag === "Customers" ? "rgb(59, 195, 102)" : "rgb(251, 218, 104)"
    );
};
