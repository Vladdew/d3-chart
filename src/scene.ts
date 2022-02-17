import * as d3 from "d3";
import { chartLinear } from "./chartLinear";

interface graph2Props {
  ref: SVGSVGElement;
  data: {
    value: number;
    client: string;
    incomingData: { segment: string; value: number }[];
  }[];
}

export const scene = ({ ref, data }: graph2Props): void => {
  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref);

  const sceneSVG = svg

    .append("g")
    .attr("class", "main-scale")
    .attr("transform", `translate(${margin + 100}, ${height})`);

  const yScale = d3
    .scaleBand()
    .range([0, -height + 50])
    .domain(data.map(s => s.client))
    .padding(0.3);

  const xScale = d3.scaleLinear().domain([1, -1]).range([width, 0]);

  sceneSVG
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("~%")));

  sceneSVG
    .append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));

  sceneSVG.selectAll().data(data, s => {
    chartLinear({
      ref: ref,
      incomingData: s!.incomingData,
      mainClass: s!.client,
    });
    return "";
  });
  const bars = d3.selectAll(".bar");

  let poligon1;
  let poligon2;

  bars.on("mouseover", function (this, e) {
    d3.selectAll(".bar").style("opacity", 0.2);
    const threeBars = d3
      .selectAll(`.${this!.className.baseVal.split(" ")[1]}`)
      .style("opacity", 1);

    const topRect = d3.select(
      d3.select(threeBars._groups[0][2].children[0])._groups[0][0]
    );

    const middleRect = d3.select(
      d3.select(threeBars._groups[0][1].children[0])._groups[0][0]
    );

    const bottomRect = d3.select(
      d3.select(threeBars._groups[0][0].children[0])._groups[0][0]
    );

    const RGBcolor = topRect.style("fill");
    let color = RGBcolor.replace(/rgb/i, "rgba");
    color = color.replace(/\)/i, ",0.5)");

    const topX = +topRect.attr("x");
    const middleX = +middleRect.attr("x");
    const bottomX = +bottomRect.attr("x");

    const topWidth = +topRect.attr("width");
    const middleWidth = +middleRect.attr("width");
    const bottomWidth = +bottomRect.attr("width");

    const topY = -321;
    const middleTopY = -240;
    const middleBottomY = -190;
    const bottomY = -110;

    poligon1 = sceneSVG
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

    poligon2 = sceneSVG
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
  });

  bars.on("mouseleave", function (e: MouseEvent) {
    d3.selectAll(".bar").style("opacity", 1);
    d3.selectAll(".polygon1").remove();
    d3.selectAll(".polygon2").remove();
  });
};

//   const makeYLines = () => d3.axisLeft(yScale);

//   chart
//     .append("g")
//     .attr("class", "grid")
//     .attr("transform", `translate(0, ${-margin / 2})`)
//     .call(makeYLines().tickSize(-width));
