import React from "react";
import classNames from "classnames"; // to conditionally apply classnames
import BookHeader from "../atoms/BookHeader";
import GraphBars from "../atoms/GraphBars";
import BookRows from "../molecules/BookRows";
import "../../styles/bookSection.scss";

interface BookSectionProps {
	data: number[];
	rows: any[];
	fill: string;
	mirrored?: boolean;
	flexDirection?: string;
}

const BookSection: React.FC<BookSectionProps> = ({
	data,
	rows,
	fill,
	mirrored = false,
	flexDirection = "row",
}) => {
	return (
		<div
			className={classNames("book-section", {
				"row-reverse": flexDirection === "row-reverse",
				default: flexDirection !== "row-reverse",
			})}>
			<BookHeader flexDirection={flexDirection} />
			<GraphBars
				data={data}
				fill={fill}
				mirrored={mirrored}
			/>
			<BookRows
				rows={rows}
				flexDirection={flexDirection}
				fill={fill}
			/>
		</div>
	);
};

export default React.memo(BookSection);
