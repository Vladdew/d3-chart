import * as _d3 from "d3";
import d3Tip from "d3-tip";

const d3 = { ..._d3, tip: d3Tip } as typeof _d3;

interface chartProps {
  ref: SVGSVGElement;
  mainClass: string;
  incomingData: { segment: string; value: number }[];
}

export const chartLinear = ({
  ref,
  incomingData,
  mainClass,
}: chartProps): void => {
  var tip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([-14, 0])
    .html(function (d: any) {
      return (
        "<span class='tooltipSpan'>" + d.target.__data__.segment + "</span>"
      );
    });

  const svg = d3.select(ref).call(tip as any);

  const margin = 60;
  const width = 1080 - 2 * margin;
  const halfWidth = width / 2;

  let curentElWidthNonCustomers = 0;
  let curentComputedXNonCustomers = halfWidth + 1;

  let curentElWidthCustomers = 0;
  let curentComputedXCustomers = halfWidth + 1;

  const marginTop =
    mainClass === "Southwest"
      ? 368
      : mainClass === "American_airlines"
      ? 240
      : 110;

  const chart = svg
    .append("g")
    .attr("class", `bar-container ${mainClass.toLowerCase()}`)
    .attr("transform", `translate(20, ${marginTop})`);

  let totalCustomersWidth = 0;
  let totalNonCustomersWidth = 0;

  let totalCustomersValue = 0;
  let totalNonCustomersValue = 0;

  const barGroups = chart
    .append("g")
    .attr("class", "bars-wrapper")
    .selectAll()
    .data(incomingData)
    .enter()
    .append("g")
    .attr(
      "class",
      s =>
        "bar " +
        s.segment.toLowerCase() +
        (s.segment === "Loyal" || s.segment === "Switcher"
          ? " bar-customer"
          : " bar-noncustomer")
    );

  barGroups
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
    .attr("height", 50)
    .attr("rx", "4")
    .attr("ry", "3")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  let customerWidth = halfWidth;
  let nonCustomerWidth = halfWidth;

  barGroups
    .append("text")
    .text(d => {
      return d.value + "%";
    })
    .attr("class", d => {
      if (d.value < 5) return "short-block-text";
      return "";
    })
    .attr("font-size", "62%")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .attr("x", d => {
      if (d.segment === "Loyal" || d.segment === "Switcher") {
        const curWidth = (d.value * halfWidth) / 100 / 2;
        const result = customerWidth + curWidth;
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
