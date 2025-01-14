import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const GraphBars = ({ data, height = 408, fill, mirrored = false }) => {
	const { zoom } = useSelector((state: RootState) => state.orderBookSettings);
	const barHeight = 17;
	const xScale = mirrored ? -1 : 1;

	const normalizedData = useMemo(() => {
		if (!data || data.length === 0) {
			return [];
		}

		let maxValue = Math.max(...data);
		if (maxValue === 0) {
			return data.map(() => 0);
		}

		maxValue = zoom ? maxValue * 2 : maxValue;
		return data.map((value) => value / maxValue);
	}, [data, zoom]);

	return (
		<div
			className="book__bars animate"
			style={{ width: "100%", height: "0", overflow: "visible" }}>
			<svg
				style={{
					width: "100%",
					height: `${height}px`,
					transform: `scale(${xScale}, 1)`,
					zIndex: 0,
					pointerEvents: "none",
				}}>
				{normalizedData.map((value, index) => (
					<g key={index}>
						<rect
							x="0"
							y={index * barHeight}
							width="100%"
							transform="scale(0 1)"
							height={barHeight}
							style={{
								transition: "transform 0.3s ease-in-out",
							}}
						/>
						<rect
							x="0"
							y={index * barHeight}
							width="100%"
							transform={`scale(${value} 1)`}
							height={barHeight}
							fill={fill}
							style={{
								transition: "transform 0.3s ease-in-out",
							}}
						/>
					</g>
				))}
			</svg>
		</div>
	);
};

export default GraphBars;
