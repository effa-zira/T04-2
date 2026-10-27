/* Stub: will draw the chart in T04-5 */
function createBarChart(data) {
  console.log("createBarChart received", data.length, "rows");
}

// Load CSV, Convert Type, Quick Check
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count // '+' converts string to number
  };
}).then(data => {
  // Quick checks
  console.log("Whole array:", data);
  console.log("Rows:", data.length);
  console.log("Max:", d3.max(data, d => d.count));
  console.log("Min:", d3.min(data, d => d.count));
  console.log("Extent:", d3.extent(data, d => d.count)); // [min, max]

  // Sort for easier reading (descending by count)
  data.sort((a, b) => d3.descending(a.count, b.count));

  // Hand off to the chart builder
  createBarChart(data);
});