import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Button } from "@mui/material";
import React from "react";

const WidgetFooter: React.FC<{
	buttonName: string;
	onButtonClick: () => void;
}> = ({ buttonName, onButtonClick }) => {
	return (
		<div
			className="component-footer__wrapper themed-border"
			style={{
				display: "flex",
				color: "#f2f2f5",
				justifyContent: "center",
			}}>
			<div style={{ flex: "1" }} />
			<Button
				variant="text"
				size="small"
				startIcon={
					<FiberManualRecordIcon
						fontSize="small"
						style={{ color: "rgb(3, 202, 155)" }}
					/>
				}
				onClick={onButtonClick}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "11px",
					color: "#f2f2f5",
					textTransform: "uppercase",
					textDecoration: "underline",
				}}
				disableRipple
				disableElevation
				disableFocusRipple>
				{buttonName}
			</Button>
		</div>
	);
};

export default WidgetFooter;
