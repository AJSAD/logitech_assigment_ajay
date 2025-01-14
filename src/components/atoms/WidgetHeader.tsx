import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { IconButton } from "@mui/material";
import React from "react";
import PrecisionLeftIcon from "../../assets/Icons/PrecisionLeftIcon";
import PrecisionRightIcon from "../../assets/Icons/PrecisionRightIcon";
import "../../styles/widgetHeader.scss";

interface WidgetHeaderProps {
	title: string;
	subTitle?: string;
	precision: "P0" | "P1" | "P2" | "P3" | "P4";
	onZoomIn: () => void;
	onZoomOut: () => void;
	onDecreasePrecision: () => void;
	onIncreasePrecision: () => void;
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
	title,
	subTitle,
	precision,
	onZoomIn,
	onZoomOut,
	onDecreasePrecision,
	onIncreasePrecision,
}) => {
	return (
		<div className="widget-header">
			<div className="widget-header-title">{title}</div>
			<div className="widget-header-subtitle">{subTitle}</div>
			<div className="widget-header-flex-grow" />
			<div className="widget-header-controls">
				<IconButton
					onClick={onIncreasePrecision}
					title="Decrease Precision"
					size="small"
					disabled={precision === "P4"}>
					<PrecisionLeftIcon
						width={17}
						height={22}
						color={
							precision === "P4"
								? "rgba(242, 242, 245, 0.2)"
								: "#f2f2f5"
						}
					/>
				</IconButton>
				<IconButton
					onClick={onDecreasePrecision}
					title="Increase Precision"
					size="small"
					disabled={precision === "P0"}>
					<PrecisionRightIcon
						width={17}
						height={22}
						color={
							precision === "P0"
								? "rgba(242, 242, 245, 0.2)"
								: "#f2f2f5"
						}
					/>
				</IconButton>
				<IconButton
					onClick={onZoomOut}
					title="Zoom Out"
					size="small">
					<ZoomOutIcon className="widget-header-icon" />
				</IconButton>
				<IconButton
					onClick={onZoomIn}
					title="Zoom In"
					size="small">
					<ZoomInIcon className="widget-header-icon" />
				</IconButton>
			</div>
		</div>
	);
};

export default WidgetHeader;
