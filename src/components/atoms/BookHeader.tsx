import React from "react";
import classNames from "classnames";
import "../../styles/bookHeader.scss";

const BookHeader: React.FC<{ flexDirection?: string }> = React.memo(
	({ flexDirection = "row" }) => {
		return (
			<div
				className={classNames("book-header", {
					"flex-row": flexDirection === "row",
					"flex-row-reverse": flexDirection === "row-reverse",
				})}>
				<div className={classNames("book-header-item")} />
				<div className={classNames("book-header-item")} />
				<div className={classNames("book-header-item", "count")}>
					Count
				</div>
				<div className={classNames("book-header-item", "amount")}>
					Amount
				</div>
				<div className={classNames("book-header-item", "total")}>
					Total
				</div>
				<div
					className={classNames("book-header-item", "price", {
						"text-right": flexDirection === "row",
						"text-left": flexDirection === "row-reverse",
					})}>
					Price
				</div>
			</div>
		);
	}
);

export default BookHeader;
