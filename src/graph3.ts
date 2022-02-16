import * as d3 from "d3";
import { graph2 } from "./graph2";

interface graph2Props {
  ref3: SVGSVGElement;
  data: {
    value: number;
    language: string;
    incomingData: { segment: string; value: number }[];
  }[];
}

export const graph3 = ({ ref3, data }: graph2Props): void => {
  const margin = 60;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;
  const svg = d3.select(ref3);
  const halfWidth = width / 2;

  let totalCustomersWidth = 0;
  let totalNonCustomersWidth = 0;

  let totalCustomersValue = 0;
  let totalNonCustomersValue = 0;

  let curentElWidthNonCustomers = 0;
  let curentComputedXNonCustomers = halfWidth + 1;

  let curentElWidthCustomers = 0;
  let curentComputedXCustomers = halfWidth + 1;

  console.log(svg);

  const chart = svg
    .append("g")
    .attr("class", "main-scale")
    .attr("transform", `translate(${margin + 100}, ${height})`);

  const yScale = d3
    .scaleBand()
    .range([0, -height / 2])
    .domain(data.map(s => s.language))
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

  //Запомните, что selectAll() вернет пустые ссылки на все круги(которые пока не существуют),
  // data() привязывает значения к элементам, которые мы хотим создать,
  //enter() возвращает ссылки на шаблоны новых элементов, а метод append() в конце-концов добавляет круги в DOM.

  const barGroups = chart.selectAll().data(data).enter().append("g");

  //   data.forEach(el => {
  //     const bars = barGroups.attr(
  //       "class",
  //       s => "bar " + s.language.toLowerCase()
  //     );
  //     el.incomingData.forEach(item => {
  //       bars.append("rect");
  //     });
  //   });

  barGroups.enter().data(data, (d, i) => {
    console.log(d, i);
    d.incomingData.forEach(el => {
      //barGroups.append("rect");
      d3.select(barGroups._groups[0][i])
        .attr("class", s => "bar " + d.language.toLowerCase())
        .attr("x", halfWidth - 200)
        .attr("y", s => yScale(d.language)!)
        .attr("width", s => 400)
        .attr("height", yScale.bandwidth())
        .append("rect")
        .attr("class", () => el.segment.toLowerCase());

      console.log(el);
    });
  });

  //   barGroups
  //     .attr("class", s => "bar " + s.language.toLowerCase())
  //     .data(data)
  //     .append("rect")
  //     .attr("x", halfWidth - 200)
  //     .attr("y", s => yScale(s.language)!)
  //     //xScale.bandwidth() / 2
  //     .attr("width", s => 400)
  //     .attr("height", yScale.bandwidth())
  //     .attr("rx", "4")
  //     .attr("ry", "3")
  //     .append("g")
  //     .data(data, s => {
  //       graph2({ ref2: ref3, incomingData: s.incomingData });
  //       console.log(s.incomingData);
  //     });
};
