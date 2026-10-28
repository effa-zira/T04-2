// t04-5-bars.js
const createBarChart = (data) => {
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 400")        // temporary
    .style("border", "1px solid black");    // dev-only border

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)  // e.g. "bar bar-859"
    .attr("width", d => d.count)               // width from the numeric column
    .attr("height", 16);                       // constant bar height
};