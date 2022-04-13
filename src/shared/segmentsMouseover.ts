import * as d3 from "d3";
import { renderSegmentsPolygons } from "../d3components/renderSegmentsPolygons";
import { popperTooltip } from "../shared/popperTooltip";

export function segmentsMouseover(
  e: React.MouseEvent<HTMLElement>,
  sceneSVG: d3.Selection<SVGGElement, unknown, null, undefined>,
  clrTimeout: () => void
) {
  d3.selectAll(".bar").style("opacity", 0.2);
  d3.selectAll(".legend-list__item").style("opacity", 0.2);
  d3.selectAll(".legend-list__segments").style("opacity", 0.2);
  d3.selectAll(".percent-xaxis").style("display", "none");

  clrTimeout();

  popperTooltip("show", e.currentTarget, `.${(e.target as any).innerHTML}`);

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
