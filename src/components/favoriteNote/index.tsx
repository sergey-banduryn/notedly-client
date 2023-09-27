import { useState } from "react";
import { useMutation } from "@apollo/client";
import { TOGGLE_FAVORITE } from "../../graphql/mutation";

export default function FavoriteNote({ user, note }) {
	const [count, setCount] = useState(note.favoriteCount);

	const [favorited, setFavorited] = useState(
		user.favorites.filter((n) => n.id === note.id).length > 0,
	);

	const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
		variables: { id: note.id },
		update: (cache) => {
			cache.evict({ id: cache.identify(user), fieldName: "favorites" });
			cache.evict({
				id: cache.identify(user),
				fieldName: "totalFavorites",
			});
		},
	});

	return (
		<>
			{favorited ? (
				<button
					onClick={() => {
						toggleFavorite();
						setFavorited(false);
						setCount(count - 1);
					}}
				>
					Remove Favorite
				</button>
			) : (
				<button
					onClick={() => {
						toggleFavorite();
						setFavorited(true);
						setCount(count + 1);
					}}
				>
					Add Favorite
				</button>
			)}
			: {count}
		</>
	);
}
