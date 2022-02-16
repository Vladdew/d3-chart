import * as d3 from "d3";
import { BaseType } from "d3";
import { on } from "events";

interface graph2Props {
  ref3: SVGSVGElement;
}

export const graph3 = ({ ref3 }: graph2Props): void => {
  const sample = [
    {
      language: "Southwest",
      value: 15,
      incomingData: [
        { segment: "Loyal", value: 41 },
        { segment: "Switcher", value: 20 },
        { segment: "Prospect", value: 12 },
        { segment: "Winback", value: 6 },
        { segment: "Lapsed", value: 3 },
        { segment: "Rejector", value: 14 },
        { segment: "Unaware", value: 4 },
      ],
    },
    {
      language: "American Airlines",
      value: 35,
      incomingData: [
        { segment: "Loyal", value: 41 },
        { segment: "Switcher", value: 20 },
        { segment: "Prospect", value: 12 },
        { segment: "Winback", value: 6 },
        { segment: "Lapsed", value: 3 },
        { segment: "Rejector", value: 14 },
        { segment: "Unaware", value: 4 },
      ],
    },
    {
      language: "Delta",
      value: 50,
      incomingData: [
        { segment: "Loyal", value: 41 },
        { segment: "Switcher", value: 20 },
        { segment: "Prospect", value: 12 },
        { segment: "Winback", value: 6 },
        { segment: "Lapsed", value: 3 },
        { segment: "Rejector", value: 14 },
        { segment: "Unaware", value: 4 },
      ],
    },
  ];

  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref3);
  const halfWidth = width / 2;

  console.log(svg);

  const chart = svg
    .append("g")
    .attr("class", "main-scale")
    .attr("transform", `translate(${margin + 100}, ${height})`);

  const yScale = d3
    .scaleBand()
    .range([0, -height / 2])
    .domain(sample.map(s => s.language))
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

  const barGroups = chart.selectAll().data(sample).enter().append("g");

  barGroups
    .attr("class", s => "bar " + s.language.toLowerCase())
    .append("rect")
    .attr("x", halfWidth - 200)
    .attr("y", s => yScale(s.language)!)
    //xScale.bandwidth() / 2
    .attr("width", s => 400)
    .attr("height", yScale.bandwidth())
    .attr("rx", "4")
    .attr("ry", "3");
};
