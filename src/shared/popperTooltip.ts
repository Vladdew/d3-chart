import { createPopper } from "@popperjs/core";

interface Iprops {
  flag: "show" | "hide";
  target: Element;
  curClass: string;
}

export const popperTooltip = function (
  flag: Iprops["flag"],
  target: Iprops["target"],
  curClass: Iprops["curClass"]
) {
  let tooltip = document.querySelector("#tooltip") as HTMLElement;
  const slicedDot = curClass.slice(1, 20);
  tooltip!.innerHTML = `Short description about the ${
    slicedDot.charAt(0).toUpperCase() + slicedDot.slice(1)
  }... <a class="tooltipLink" href="URL">Read more</a> <div id='arrow' data-popper-arrow></div>`;

  const popperInstance = createPopper(target, tooltip, {
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

  if (flag === "show") {
    tooltip!.setAttribute("data-show", "");
    popperInstance.update();
  } else {
    tooltip.removeAttribute("data-show");
    popperInstance.update();
  }
};
