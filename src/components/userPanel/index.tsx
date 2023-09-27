import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../App";
import { GET_ME } from "../../graphql/query";
import { ADD_FAKE_NOTES, DELETE_ALL_NOTES } from "../../graphql/mutation";

export default function UserPanel() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	let navigate = useNavigate();

	const { data: dataUser } = useQuery(GET_ME, {
		variables: { offset: 0, limit: 1 },
	});

	const [deleteAllNotes, { client }] = useMutation(DELETE_ALL_NOTES, {});

	async function logout() {
		client.resetStore();
		navigate("/");
		localStorage.removeItem("notedlyToken");
		isLoggedInVar(false);
	}
	function signup() {
		navigate("/signup");
	}
	function signin() {
		navigate("/signin");
	}

	const [addFakeNotes] = useMutation(ADD_FAKE_NOTES, {
		update: (cache) => {
			cache.evict({
				id: cache.identify(dataUser?.me),
				fieldName: "notes",
			});
			cache.evict({
				id: cache.identify(dataUser?.me),
				fieldName: "totalNotes",
			});
			cache.evict({
				fieldName: "notes",
			});
			cache.evict({
				fieldName: "totalNotes",
			});
		},
	});

	return (
		<>
			{String(isLoggedIn)}
			{isLoggedIn ? (
				<>
					<button onClick={logout}>Logout</button>
					<button
						onClick={() => {
							addFakeNotes();
						}}
					>
						addFakeNotes
					</button>
					<button
						onClick={async () => {
							let { data } = await deleteAllNotes();
							if (data.deleteAllNotes) client.resetStore();
						}}
					>
						deleteAllNotes
					</button>
				</>
			) : (
				<>
					<button onClick={signin}>Signin</button>
					<button onClick={signup}>Signup</button>
				</>
			)}
		</>
	);
}
