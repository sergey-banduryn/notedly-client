import { gql } from "@apollo/client";

export const GET_NOTE = gql`
  query Note($id: ID!) {
    note(id: $id) {
      id
      content
      author {
        id
      }
      favoriteCount
    }
  }
`;

export const GET_NOTES = gql`
  query Notes($offset: Int!, $limit: Int!) {
    notes(offset: $offset, limit: $limit) {
      id
      content
    }
    totalNotes
  }
`;

export const GET_ME = gql`
  query Me($offset: Int!, $limit: Int!) {
    me {
      id
      favorites(offset: $offset, limit: $limit) {
        id
      }
    }
  }
`;

export const GET_MY_NOTES = gql`
  query MeNotes($offset: Int!, $limit: Int!) {
    me {
      notes(offset: $offset, limit: $limit) {
        id
        content
      }
      totalNotes
    }
  }
`;

export const GET_MY_FAVORITES = gql`
  query MeFavorites($offset: Int!, $limit: Int!) {
    me {
      favorites(offset: $offset, limit: $limit) {
        id
        content
      }
      totalFavorites
    }
  }
`;
