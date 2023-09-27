import { useState } from "react";
import { Note } from "../../types";

// import "./index.css";

export default function NoteForm({
	action,
	note,
}: {
	action: Function;
	note?: Note;
}) {
	const [values, setValues] = useState({ ...note });

	function onChange(e) {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// console.log(values);
					action({
						variables: { ...values },
					});
				}}
			>
				<textarea
					required
					name="content"
					value={values.content}
					onChange={onChange}
				/>

				<button type="submit">Save</button>
			</form>
		</>
	);
}

// ts не выдает ошибку
// при деструктуризации note
// useState({ ...note });
// хотя его может и не быть, в случае NewNote
