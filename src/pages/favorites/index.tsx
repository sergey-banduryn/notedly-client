import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MY_FAVORITES } from "../../graphql/query";
import Notes from "../../components/notes";
import Pagination from "../../components/pagination";

const Favorites = () => {
	let location = useLocation();
	let params = new URLSearchParams(location.search);

	let currentPage = +params.get("page");
	if (!currentPage) currentPage = 1;

	const limit = 10;
	const offset = (currentPage - 1) * limit;

	const { loading, error, data } = useQuery(GET_MY_FAVORITES, {
		variables: { offset, limit },
	});
	return (
		<>
			<div>Favorites</div>
			{loading && <div className="loading">loading</div>}
			<Notes notes={data?.me.favorites} />
			<Pagination total={data?.me.totalFavorites} />
		</>
	);
};

export default Favorites;
