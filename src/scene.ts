import * as d3 from "d3";
import { chartLinear } from "./chartLinear";

interface graph2Props {
  ref3: SVGSVGElement;
  data: {
    value: number;
    client: string;
    incomingData: { segment: string; value: number }[];
  }[];
}

export const scene = ({ ref3, data }: graph2Props): void => {
  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref3);

  console.log(svg);

  const chart = svg
    .append("g")
    .attr("class", "main-scale")
    .attr("transform", `translate(${margin + 100}, ${height})`);

  const yScale = d3
    .scaleBand()
    .range([0, -height + 50])
    .domain(data.map(s => s.client))
    .padding(0.3);

  const xScale = d3.scaleLinear().domain([1, -1]).range([width, 0]);

  chart
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("~%")));

  chart
    .append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale));

  const barGroups = chart.selectAll().data(data).enter().append("g");

  barGroups
    .data(data)
    .enter()
    .data(data, s => {
      chartLinear({
        ref: ref3,
        incomingData: s.incomingData,
        mainClass: s.client,
      });
      return "";
    });
};

//   const makeYLines = () => d3.axisLeft(yScale);

//   chart
//     .append("g")
//     .attr("class", "grid")
//     .attr("transform", `translate(0, ${-margin / 2})`)
//     .call(makeYLines().tickSize(-width));
