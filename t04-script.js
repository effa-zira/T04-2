/* =========================================================
   T04 Data Loading & Charting Logic
   ========================================================= */

// --- T04-4 Step 4 & T04-5 Step 1: Chart function stub ---
function createBarChart(data) {
    drawChart(data);
}

// --- T04-4 Step 3: Load CSV, Convert Type, Quick Check ---
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // '+' converts string to number
    };
}).then(data => {
    // T04-4 Step 4: Quick checks in console
    console.log("Loaded Data:", data);
    console.log("rows:", data.length);
    console.log("max:", d3.max(data, d => d.count));
    console.log("min:", d3.min(data, d => d.count));
    console.log("extent:", d3.extent(data, d => d.count));
    
    // Sort data descending for better visuals
    data.sort((a, b) => d3.descending(a.count, b.count));

    // Call the chart builder
    createBarChart(data);
}).catch(error => {
    console.error("Error loading CSV:", error);
});


// --- T04-5, T04-6, T04-7 combined: The actual drawing logic ---
const drawChart = (data) => {
    
    // T04-6 Step 1: Sizes (logical vs display)
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);

    // T04-6 Step 1: Create SVG root with viewBox
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`) // Internal coordinate system
        .attr("width", displayW)                  // Rendered width
        .attr("height", displayH)                 // Rendered height
        .style("border", "1px solid #ccc")
        .style("display", "block"); 

    // T04-6 Step 2: Linear X scale for count
    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW - 120]); // 120px reserved for labels

    // T04-6 Step 3: Band Y scale for categorical brands
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    // T04-7 Step 2: Add object to hold groups (text and rectangles)
    const labelX = 100; // Offset to leave room for brand names

    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // T04-7 Step 3: Add back the rectangles inside the group
    barAndLabel
        .append("rect")
        .attr("x", labelX) // Start at x=100
        .attr("y", 0)      // Group sets vertical position
        .attr("width", d => xScale(d.count)) // Scaled width
        .attr("height", yScale.bandwidth())  // Band thickness
        .attr("fill", "steelblue");

    // T04-7 Step 4: Add category text (Brand names)
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelX)
        .attr("y", 15) // Center vertically in the band
        .attr("text-anchor", "end") // Right-align
        .style("font-family", "sans-serif")
        .style("font-size", "13px")
        .style("fill", "#333");

    // T04-7 Step 5: Add value text (Counts)
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => labelX + xScale(d.count) + 4) // Just past bar end
        .attr("y", 12) 
        .style("font-family", "sans-serif")
        .style("font-size", "13px")
        .style("fill", "#333");
};