import * as d3 from "d3";
import { BaseType } from "d3";
import { on } from "events";

interface graph2Props {
  ref2: SVGSVGElement;
}

export const graph2 = ({ ref2 }: graph2Props): void => {
  const sample = [
    { language: "Souyhwest", value: 15 },
    { language: "American Airlines", value: 35 },
    { language: "Delta", value: 50 },
  ];

  const incomingData = [
    { segment: "Loyal", value: 41 },
    { segment: "Switcher", value: 20 },
    { segment: "Prospect", value: 12 },
    { segment: "Winback", value: 6 },
    { segment: "Lapsed", value: 3 },
    { segment: "Rejector", value: 14 },
    { segment: "Unaware", value: 4 },
  ];

  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref2);

  console.log(svg);

  const halfWidth = width / 2;

  let curentElWidthNonCustomers = 0;
  let curentComputedXNonCustomers = halfWidth + 1;

  let curentElWidthCustomers = 0;
  let curentComputedXCustomers = halfWidth + 1;

  console.log("graph2", width, height, ref2);

  const chart = svg
    .append("g")
    .attr("class", "main-scale")
    .attr("transform", `translate(${margin}, ${margin})`);

  const yScale = d3.scaleBand().range([0, 50]).padding(0.02);

  chart.append("g").call(d3.axisLeft(yScale));

  const xScale = d3.scaleLinear().domain([1, -1]).range([width, 0]);
  chart
    .append("g")
    .attr("transform", `translate(0, 50)`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("~%")));

  let totalCustomersWidth = 0;
  let totalNonCustomersWidth = 0;

  let totalCustomersValue = 0;
  let totalNonCustomersValue = 0;

  //   const makeYLines = () => d3.axisLeft(yScale);

  //   chart
  //     .append("g")
  //     .attr("class", "grid")
  //     .attr("transform", `translate(0, ${-margin / 2})`)
  //     .call(makeYLines().tickSize(-width));

  const mouseleave = function (this: Element, d: MouseEvent) {
    // d.cancelBubble = false;
    d3.selectAll(".bar").style("opacity", 1);
    // console.log(d, d.currentTarget);
    console.log("mouseleave");
    console.log(this);
  };

  const mouseleaverWrap = function (this: Element, d: MouseEvent) {
    // d.cancelBubble = false;
    // d3.selectAll(".bar").style("opacity", 1);
    // console.log(d, d.currentTarget);
    console.log("mouseleaverWrap");
    console.log(this);
  };

  const mouseover = function (this: Element, d: MouseEvent) {
    // const target = d.target as Element;
    // console.log("target.id", target.parentNode);
    // if (d.target) {
    //   console.log(d, d.target);
    // }
    console.log("mouseover");
    console.log(this);
    d3.selectAll(".bar").style("opacity", 0.2);
    d3.select(this).style("opacity", 1);
  };

  const mouseoverWrap = function (this: Element, d: MouseEvent) {
    console.log("mouseoverWrap");
    console.log(this);
  };

  const barGroups = chart
    .append("g")
    .attr("class", "bars-wrapper")

    .on("mouseleave", mouseleaverWrap)
    .on("mouseover", mouseoverWrap)
    .selectAll()
    .data(incomingData)
    .enter()
    .append("g")
    .on("mouseleave", mouseleave)
    .on("mouseover", mouseover);

  barGroups
    .attr("class", s => "bar " + s.segment.toLowerCase())
    .append("rect")
    .attr("x", s => {
      let result = 0;
      if (s.segment === "Loyal" || s.segment === "Switcher") {
        curentElWidthCustomers = (s.value * halfWidth) / 100;
        result += curentComputedXCustomers;
        curentComputedXCustomers += curentElWidthCustomers;
        totalCustomersWidth += curentElWidthCustomers;
        totalCustomersValue += s.value;
        return result;
      } else {
        curentElWidthNonCustomers = (s.value * halfWidth) / 100;
        curentComputedXNonCustomers -= curentElWidthNonCustomers;
        totalNonCustomersWidth += curentElWidthNonCustomers;
        totalNonCustomersValue += s.value;
        return curentComputedXNonCustomers;
      }
    })
    .attr("width", s => {
      return (s.value * halfWidth) / 100 - 2;
    })
    .attr("height", yScale.bandwidth())
    .attr("rx", "4")
    .attr("ry", "3");

  let customerWidth = halfWidth;
  let nonCustomerWidth = halfWidth;

  barGroups
    .append("text")
    .text((d: any) => {
      if (d.value < 5) return "";
      return d.value + "%";
    })
    .attr("font-size", "62%")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("x", d => {
      if (d.segment === "Loyal" || d.segment === "Switcher") {
        const width = (d.value * halfWidth) / 100 / 2;
        const result = customerWidth + width;
        customerWidth += (d.value * halfWidth) / 100;
        return result;
      } else {
        const x = (d.value * halfWidth) / 100 / 2;
        const result = nonCustomerWidth - x;
        nonCustomerWidth -= (d.value * halfWidth) / 100;
        return result;
      }
    })
    .attr("y", 30);

  const totalPercentXScaleCustomers = d3
    .scaleBand()
    .domain([totalCustomersValue + "%"])
    .range([0, totalCustomersWidth - 2]);

  const totalPercentXScaleNonCustomers = d3
    .scaleBand()
    .domain([totalNonCustomersValue + "%"])
    .range([0, totalNonCustomersWidth - 2]);

  chart
    .append("g")
    .attr("class", "percent-xaxis percent-xaxis__customers")
    .attr("transform", `translate(${halfWidth + 1}, -10)`)
    .call(d3.axisBottom(totalPercentXScaleCustomers));

  chart
    .append("g")
    .attr("class", "percent-xaxis percent-xaxis__non-customers")
    .attr("transform", `translate(${totalCustomersWidth}, -10)`)
    .call(d3.axisBottom(totalPercentXScaleNonCustomers));
};
