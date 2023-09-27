import { gql } from "@apollo/client";

export const NEW_NOTE = gql`
	mutation NewNote($content: String!) {
		newNote(content: $content) {
			id
		}
	}
`;

export const EDIT_NOTE = gql`
	mutation UpdateNote($id: ID!, $content: String!) {
		updateNote(id: $id, content: $content) {
			id
			content
		}
	}
`;

export const DELETE_NOTE = gql`
	mutation DeleteNote($id: ID!) {
		deleteNote(id: $id)
	}
`;

export const TOGGLE_FAVORITE = gql`
	mutation ToggleFavorite($id: ID!) {
		toggleFavorite(id: $id) {
			id
			favoriteCount
		}
	}
`;

export const ADD_FAKE_NOTES = gql`
	mutation AddFakeNotes {
		addFakeNotes
	}
`;

export const DELETE_ALL_NOTES = gql`
	mutation DeleteAllNotes {
		deleteAllNotes
	}
`;
