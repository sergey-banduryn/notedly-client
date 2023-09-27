import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { NEW_NOTE } from "../../graphql/mutation";
import { GET_NOTES, GET_MY_NOTES, GET_ME } from "../../graphql/query";
import NoteForm from "../../components/noteForm";

export default function NewNote() {
	let navigate = useNavigate();

	const { data: dataUser } = useQuery(GET_ME, {
		variables: { offset: 0, limit: 1 },
	});

	const [newNote, { data, loading, error }] = useMutation(NEW_NOTE, {
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
		onCompleted: (data) => {
			navigate(`/note/${data.newNote.id}`);
		},
	});

	if (!dataUser) return null;

	return <NoteForm action={newNote} />;
}
