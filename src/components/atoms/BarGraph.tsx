import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface BarGraphProps {
	data: number[];
	mirrored?: boolean;
	fill?: string | ((index: number, value: number) => string);
}

const BarGraph: React.FC<BarGraphProps> = ({
	data,
	mirrored = false,
	fill = "steelblue",
}) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		// Dimensions
		const width = 400;
		const height = 400;
		const barWidth = height / data.length;

		// Create SVG
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height);

		// Clear any previous content
		svg.selectAll("*").remove();

		// Scale for Y-axis (amount values)
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data) || 0])
			.range([0, width]);

		// Append bars
		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", (d) => (mirrored ? width - yScale(d) : 0))
			.attr("y", (_, i) => i * barWidth)
			.attr("width", (d) => yScale(d))
			.attr("height", barWidth)
			.attr("fill", (d, i) =>
				typeof fill === "function" ? fill(i, d) : fill
			)
			.attr("fill-opacity", 0.2);

		// Append X-axis labels (vertical, index-based)
		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.attr("x", mirrored ? width + 5 : -5)
			.attr("y", (_, i) => i * barWidth + barWidth / 2)
			.attr("dy", "0.35em")
			.attr("text-anchor", mirrored ? "start" : "end")
			.text((_, i) => i + 1)
			.attr("fill", "black")
			.style("font-size", "12px");
	}, [data, mirrored, fill]);

	return <svg ref={svgRef}></svg>;
};

export default BarGraph;
