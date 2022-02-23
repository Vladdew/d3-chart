import * as d3 from "d3";

interface Iprops {
  className: string;
  scene: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export const renderBarPolygons = ({ className, scene }: Iprops): void => {
  const threeBars = document.querySelectorAll(className);

  const topRect = d3.select(threeBars[2].children[0]);
  const middleRect = d3.select(threeBars[1].children[0]);
  const bottomRect = d3.select(threeBars[0].children[0]);

  const RGBcolor = topRect.style("fill");
  let color = RGBcolor.replace(/rgb/i, "rgba");
  color = color.replace(/\)/i, ",0.5)");

  const topX = +topRect.attr("x") + 2;
  const middleX = +middleRect.attr("x") + 2;
  const bottomX = +bottomRect.attr("x") + 2;

  const topWidth = +topRect.attr("width") - 3;
  const middleWidth = +middleRect.attr("width") - 3;
  const bottomWidth = +bottomRect.attr("width") - 3;

  const topY = -321;
  const middleTopY = -240;
  const middleBottomY = -190;
  const bottomY = -110;

  scene
    .append("polygon")
    .classed("polygon1", true)
    .attr(
      "points",
      ` ${topX + topWidth},${topY} ${
        middleX + middleWidth
      },${middleTopY} ${middleX},${middleTopY} ${topX},${topY}`
    )
    .attr("fill", color)
    .attr("stroke", RGBcolor);

  scene
    .append("polygon")
    .classed("polygon2", true)
    .attr(
      "points",
      ` ${middleX + middleWidth},${middleBottomY} ${
        bottomX + bottomWidth
      },${bottomY} ${bottomX},${bottomY} ${middleX},${middleBottomY}`
    )
    .attr("fill", color)
    .attr("stroke", RGBcolor);
};
