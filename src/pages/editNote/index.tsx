import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_NOTE } from "../../graphql/mutation";
import { GET_NOTE, GET_ME } from "../../graphql/query";
import NoteForm from "../../components/noteForm";

export default function EditNote() {
	const { id } = useParams();
	let navigate = useNavigate();

	const { data: dataNote } = useQuery(GET_NOTE, { variables: { id } });

	const { data: dataUser } = useQuery(GET_ME, {
		variables: { offset: 0, limit: 1 },
	});

	const [editNote, { data: dataEdit, error }] = useMutation(EDIT_NOTE, {
		// refetchQueries: [GET_NOTES, GET_MY_NOTES],

		onError: (error) => {
			// console.log(error.graphQLErrors);
			// console.log(error.networkError);
		},
		onCompleted: (dataEdit) => {
			navigate(`/note/${dataEdit.updateNote.id}`, { replace: true });
		},
	});

	if (dataUser?.me.id !== dataNote?.note.author.id)
		return <div>Not access</div>;

	return <NoteForm action={editNote} note={dataNote?.note} />;
}
