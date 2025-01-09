import React from "react";
import { IconButton } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface WidgetHeaderProps {
	title: string;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onDecreasePrecision: () => void;
	onIncreasePrecision: () => void;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
	title,
	onZoomIn,
	onZoomOut,
	onDecreasePrecision,
	onIncreasePrecision,
}) => {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-between",
				blockSize: "border-box",
				padding: "10px",
				backgroundColor: "#0e3452",
				borderBottom: "2px solid rgba(100, 100, 100, 0.3)",
			}}>
			{/* Title Section */}
			<div style={{ fontWeight: "bold", fontSize: "16px" }}>{title}</div>

			{/* Icon Buttons Section */}
			<div>
				<IconButton
					onClick={onDecreasePrecision}
					title="Decrease Precision"
					size="small">
					<ChevronLeftIcon />
				</IconButton>
				<IconButton
					onClick={onIncreasePrecision}
					title="Increase Precision"
					size="small">
					<ChevronRightIcon />
				</IconButton>
				<IconButton
					onClick={onZoomIn}
					title="Zoom In"
					size="small">
					<ZoomInIcon />
				</IconButton>
				<IconButton
					onClick={onZoomOut}
					title="Zoom Out"
					size="small">
					<ZoomOutIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default WidgetHeader;
