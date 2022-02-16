import * as d3 from "d3";

interface graphProps {
  width: number;
  height: number;
  ref: SVGSVGElement;
  data: Array<number>;
}

export const graph = ({ ref, width, height, data }: graphProps): void => {
  const barWidth = 600,
    scaleFactor = 1,
    barHeight = 20;

  const graph = d3
    .select(ref)
    .attr("width", barWidth)
    .attr("height", barHeight * data.length);

  const bar = graph
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d: any, i: number) {
      return "translate(0," + i * barHeight + ")";
    });

  bar
    .append("rect")
    .attr("width", function (d: any) {
      return d * scaleFactor;
    })
    .attr("height", barHeight - 1);

  bar
    .append("text")
    .attr("x", function (d: any) {
      return d * scaleFactor;
    })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d: any) {
      return d;
    });
};
