import * as d3 from "d3";
import { createPopper } from "@popperjs/core";
import { chartLinear } from "./chartLinear";
import { renderBarPolygons } from "./renderBarPolygons";
import { renderSegmentsPolygons } from "./renderSegmentsPolygons";

interface sceneProps {
  ref: SVGSVGElement;
  data: {
    value: number;
    client: string;
    incomingData: { segment: string; value: number }[];
  }[];
}

export const scene = ({ ref, data }: sceneProps): void => {
  let TTFlag = false;
  let popperInstance;
  let tooltip = document.querySelector("#tooltip") as HTMLElement;

  const margin = 60;
  const width = 1080 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref);

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

  Array.from(document.querySelectorAll(".axis--x .tick text")).forEach(tick => {
    const value =
      tick.innerHTML[0] === "−"
        ? +tick.innerHTML.slice(1, -1)
        : +tick.innerHTML.slice(0, -1);

    value % 20 && d3.select(tick).style("display", "none");
  });

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

  // **************************************************************************************************

  function mouseover(this: any, e: React.MouseEvent<SVGSwitchElement>) {
    d3.selectAll(".percent-xaxis").style("display", "none");
    d3.selectAll(".bar").style("opacity", 0.2);
    d3.selectAll(".legend-list__item").style("opacity", 0.2);

    let barClassName = e.currentTarget.className.baseVal;
    if (barClassName) {
      if (barClassName.includes("bar-customer")) {
        d3.select(".legend-list__noncustomers-segments").style("opacity", 0.2);
      }

      if (barClassName.includes("bar-noncustomer")) {
        d3.select(".legend-list__customers-segments").style("opacity", 0.2);
      }

      barClassName = `.${barClassName.split(" ")[1]}`;
    }

    let checkMarkClassName = (e.currentTarget as any).className;
    if (typeof checkMarkClassName === "string") {
      checkMarkClassName = `.${checkMarkClassName.split(" ")[1].slice(0, -5)}`;

      const slicedDot = checkMarkClassName.slice(1, 10);
      tooltip!.innerHTML = `Short description about the ${
        slicedDot.charAt(0).toUpperCase() + slicedDot.slice(1)
      }... <a class="tooltipLink" href="URL">Read more</a> <div id='arrow' data-popper-arrow></div>`;

      popperInstance = createPopper(this, tooltip, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
      tooltip!.setAttribute("data-show", "");

      popperInstance.update();
    }

    if (barClassName) {
      d3.selectAll(barClassName).style("opacity", 1);
      d3.selectAll(barClassName + "-item").style("opacity", 1);
      renderBarPolygons({
        className: barClassName,
        scene: sceneSVG,
      });

      const cur = (d3.select(e.currentTarget) as any)._groups[0][0].children[0];
      const attrX = +d3.select(cur).attr("x");
      const attrHalfWidth = +d3.select(cur).attr("width") / 2;

      d3.select(e.currentTarget)
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

  function mouseleave() {
    setTimeout(() => {
      if (!TTFlag) tooltip.removeAttribute("data-show");
    }, 100);

    if (
      d3.select(".percentage__label input").attr("aria-checked") !== "false"
    ) {
      d3.selectAll(".percent-xaxis").style("display", "inline");
    }

    d3.selectAll(".bar").style("opacity", 1);
    d3.selectAll(".legend-list__item").style("opacity", 1);
    d3.selectAll(".legend-list__segments").style("opacity", 1);
    d3.selectAll(".polygon1").remove();
    d3.selectAll(".polygon2").remove();
  }

  function segmentsMouseover(this: any, e: MouseEvent) {
    d3.selectAll(".bar").style("opacity", 0.2);
    d3.selectAll(".legend-list__item").style("opacity", 0.2);
    d3.selectAll(".legend-list__segments").style("opacity", 0.2);
    d3.selectAll(".percent-xaxis").style("display", "none");

    tooltip!.innerHTML = `Short description about the ${
      (e.target as any).innerHTML
    }... <a class="tooltipLink" href="URL">Read more</a> <div id='arrow' data-popper-arrow></div>`;

    popperInstance = createPopper(this, tooltip, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
    tooltip!.setAttribute("data-show", "");

    popperInstance.update();

    if ((e.target as any).innerHTML === "Customers") {
      d3.selectAll(".bar-customer").style("opacity", 1);
      d3.selectAll(".legend-list__item-customer").style("opacity", 1);
      d3.select(e.target as any).style("opacity", 1);
      if (
        d3.select(".percentage__label input").attr("aria-checked") !== "false"
      ) {
        d3.selectAll(".percent-xaxis").style("display", "inline");
      }

      renderSegmentsPolygons({
        flag: "Customers",
        scene: sceneSVG,
      });
    }

    if ((e.target as any).innerHTML === "Non-customers") {
      d3.selectAll(".bar-noncustomer").style("opacity", 1);
      d3.selectAll(".legend-list__item-noncustomer").style("opacity", 1);
      d3.select(e.target as any).style("opacity", 1);
      if (
        d3.select(".percentage__label input").attr("aria-checked") !== "false"
      ) {
        d3.selectAll(".percent-xaxis").style("display", "inline");
      }

      renderSegmentsPolygons({
        flag: "Non-customers",
        scene: sceneSVG,
      });
    }
  }

  function segmentsMouseleave() {
    setTimeout(() => {
      if (!TTFlag) tooltip.removeAttribute("data-show");
    }, 100);

    d3.selectAll(".bar").style("opacity", 1);
    d3.selectAll(".legend-list__item").style("opacity", 1);
    d3.selectAll(".legend-list__segments").style("opacity", 1);

    if (
      d3.select(".percentage__label input").attr("aria-checked") !== "false"
    ) {
      d3.selectAll(".percent-xaxis").style("display", "inline");
    }

    d3.selectAll(".polygon1").remove();
    d3.selectAll(".polygon2").remove();
  }

  const bars = d3.selectAll(".bar");
  const legendItems = d3.selectAll(".legend-list__item");
  const segments = d3.selectAll(".legend-list__segments");

  bars.on("mouseover", mouseover);
  legendItems.on("mouseover", mouseover);

  segments.on("mouseover", segmentsMouseover);
  segments.on("mouseleave", segmentsMouseleave);

  bars.on("mouseleave", mouseleave);
  legendItems.on("mouseleave", mouseleave);

  function TTmouseleave() {
    TTFlag = false;
    tooltip.removeAttribute("data-show");
  }

  function TTmouseover() {
    TTFlag = true;
  }

  d3.select("#tooltip").on("mouseleave", TTmouseleave);
  d3.select("#tooltip").on("mouseover", TTmouseover);
};
