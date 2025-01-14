import React from "react";

const BookRow = ({
	count,
	amount,
	total,
	price,
	isNew,
	flexDirection = "row",
	fill,
}) => (
	<div
		className="book__row book__row--reversed"
		style={{
			display: "flex",
			flexDirection: flexDirection,
			justifyContent: "space-between",
			height: "17px",
			flexWrap: "wrap",
			margin: "0 5px",
			backgroundColor: isNew ? fill : "inherit",
		}}>
		<div
			style={{
				width: "15px",
				minWidth: "15px",
				maxWidth: "15px",
				textAlign: "center",
				padding: "0px",
			}}></div>
		<div
			style={{
				width: "15px",
				minWidth: "15px",
				maxWidth: "15px",
				textAlign: "center",
				padding: "0px",
			}}></div>
		<div
			style={{
				width: "40px",
				textAlign: "center",
				whiteSpace: "nowrap",
				padding: "0 5px",
			}}>
			{count}
		</div>
		<div
			style={{
				minWidth: "25%",
				padding: "0 5px",
				textAlign: "right",
			}}>
			<span>{amount}</span>
		</div>
		<div
			style={{
				width: "65px",
				padding: "0 5px",
				textAlign: "right",
			}}>
			<span>{total}</span>
		</div>
		<div
			className="price"
			style={{
				minWidth: "25%",
				padding: "0 5px",
				textAlign: flexDirection === "row" ? "right" : "left",
			}}>
			<span>{price}</span>
		</div>
	</div>
);

export default BookRow;
