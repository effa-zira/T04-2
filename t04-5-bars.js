// t04-5-bars.js
const createBarChart = (data) => {
  // SVG internal coordinate system (used to position and size chart elements)
  const viewW = 500, viewH = 1600;

  // SVG size displayed on the webpage
  const displayW = 640, displayH = 420;

  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", `0 0 ${viewW} ${viewH}`)  // internal coordinate system
    .attr("width", displayW)                   // displayed width
    .attr("height", displayH)                  // displayed height
    .style("border", "1px solid black");

  // X scale (numeric): count -> bar width
  const xMax = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, xMax])      // input: 0 to the largest count
    .range([0, viewW]);     // output: 0 to the SVG's logical width

  // Y scale (categorical): brand -> vertical position
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))  // all brand names
    .range([0, viewH])               // top to bottom of the SVG
    .paddingInner(0.2)               // space between bars
    .paddingOuter(0.1);              // space before first and after last bar

  // Bars
  svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)                            // start at the left edge
    .attr("y", d => yScale(d.brand))         // position by brand
    .attr("width", d => xScale(d.count))     // scaled width
    .attr("height", yScale.bandwidth())      // height from the band scale
    .attr("fill", "steelblue");
};