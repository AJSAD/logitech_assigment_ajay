import React from "react";
import BookRow from "../atoms/BookRow";

const BookRows = ({ rows, flexDirection = "row", fill }) => (
	<div
		className="book__rows animate"
		style={{
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: "408px",
			color: "#f2f2f5",
		}}>
		{rows.map((row, index) => (
			<BookRow
				key={index}
				count={row.count}
				amount={row.amountStr}
				total={row.totalStr}
				price={row.price}
				isNew={row.isNew}
				flexDirection={flexDirection}
				fill={fill}
			/>
		))}
	</div>
);

export default BookRows;
