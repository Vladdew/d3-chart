import * as d3 from "d3";
import { popperTooltip } from "../shared/popperTooltip";
import { hideOddTicks } from "../shared/hideOddTicks";
import { barsAndItemsMouseover } from "../shared/barsAndItemsMouseover";
import { barsAndItemsMouseleave } from "../shared/barsAndItemsMouseleave";
import { segmentsMouseleave } from "../shared/segmentsMouseleave";
import { segmentsMouseover } from "../shared/segmentsMouseover";
import { chartLinear } from "./chartLinear";
interface sceneProps {
  ref: SVGSVGElement;
  data: {
    value: number;
    client: string;
    incomingData: { segment: string; value: number }[];
  }[];
}

export const scene = ({ ref, data }: sceneProps): void => {
  const margin = 60;
  const width = 1080 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref);

  let TTFlag = false;
  let timeOutId: any;

  const sceneSVG = svg
    .append("g")
    .attr("class", "main-scale")
    .attr("transform", `translate(20, ${height})`);

  const yScale = d3
    .scaleBand()
    .range([0, -height + 50])
    .domain(["1", "2", "3"])
    .padding(0.3);

  const xScale = d3.scaleLinear().domain([1, -1]).range([width, 0]);

  sceneSVG
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisBottom(xScale).tickSize(-height).ticks(20, "~%"));

  hideOddTicks();

  sceneSVG
    .append("g")
    .attr("class", "axis axis--y")
    .attr("transform", `translate(0, 0)`)
    .call(d3.axisLeft(yScale).tickSize(-width));

  sceneSVG.selectAll().data(data, s => {
    chartLinear({
      ref: ref,
      incomingData: s!.incomingData,
      mainClass: s!.client,
    });
    return "";
  });

  const legendItemsCust = d3
    .select(".legend-list__wrap .legend-list__customers")
    .selectAll("li")
    .data(data[0].incomingData.reverse().slice(-2).reverse())
    .enter()
    .append("li")
    .attr(
      "class",
      s =>
        "legend-list__item " +
        s.segment.toLowerCase() +
        "-item legend-list__item-customer"
    )
    .attr("aria-describedby", "tooltip");

  const legendItemsNonCust = d3
    .select(".legend-list__wrap .legend-list__noncustomers")
    .selectAll("li")
    .data(data[1].incomingData.reverse().slice(0, 5))
    .enter()
    .append("li")
    .attr(
      "class",
      s =>
        "legend-list__item " +
        s.segment.toLowerCase() +
        "-item legend-list__item-noncustomer"
    )
    .attr("aria-describedby", "tooltip");

  legendItemsCust
    .append("span")
    .attr(
      "class",
      d => `legend-list__checkmark ${d.segment.toLowerCase()}-checkmark`
    );

  legendItemsNonCust
    .append("span")
    .attr(
      "class",
      d => `legend-list__checkmark ${d.segment.toLowerCase()}-checkmark`
    );

  legendItemsCust.append("span").text(d => d.segment);
  legendItemsNonCust.append("span").text(d => d.segment);

  const bars = d3.selectAll(".bar");
  const legendItems = d3.selectAll(".legend-list__item");
  const segments = d3.selectAll(".legend-list__segments");

  function defTimeout(el: any) {
    setTimeout(() => {
      if (!TTFlag) popperTooltip("hide", el, "");
    }, 100);
  }

  function clrTimeout() {
    clearInterval(timeOutId);
  }

  bars.on("mouseover", function () {
    return barsAndItemsMouseover.call(this, sceneSVG, null);
  });

  legendItems.on("mouseover", function () {
    return barsAndItemsMouseover.call(this, sceneSVG, clrTimeout);
  });

  bars.on("mouseleave", function () {
    return barsAndItemsMouseleave.call(this, null);
  });
  legendItems.on("mouseleave", function () {
    return barsAndItemsMouseleave.call(this, defTimeout);
  });

  segments.on("mouseover", function (e) {
    return segmentsMouseover(e, sceneSVG, clrTimeout);
  });

  segments.on("mouseleave", function () {
    return segmentsMouseleave.call(this, defTimeout);
  });

  function TTmouseleave(this: any) {
    TTFlag = false;
    popperTooltip("hide", this, "");
  }

  function TTmouseover() {
    TTFlag = true;
  }

  d3.select("#tooltip").on("mouseleave", TTmouseleave);
  d3.select("#tooltip").on("mouseover", TTmouseover);
};
