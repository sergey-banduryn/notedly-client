import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./index.css";

export default function Pagination({ total }) {
	if (!total) return null;

	let location2 = useLocation();
	let params = new URLSearchParams(location2.search);

	let currentPage = +params.get("page");
	if (!currentPage) currentPage = 1;

	const limit = 10;

	const totalPages = Math.ceil(total / limit);
	if (totalPages == 1) return null;

	const pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}

	function getURL(page) {
		let url = new URL(location.href);
		if (page === 1) url.searchParams.delete("page");
		else url.searchParams.set("page", page);

		return url.pathname + url.search;
	}
	return (
		<div>
			{pages.map((page, index) => {
				return (
					<Link
						to={getURL(page)}
						key={index}
						className={[
							"page",
							page === currentPage && "curr-page",
						].join(" ")}
					>
						<span>{page}</span>
					</Link>
				);
			})}
		</div>
	);
}
