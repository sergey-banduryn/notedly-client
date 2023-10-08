import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME, GET_NOTE } from "../../graphql/query";
import { DELETE_NOTE, TOGGLE_FAVORITE } from "../../graphql/mutation";
import FavoriteNote from "../../components/favoriteNote";

export default function NotePage() {
  const { id } = useParams();
  let navigate = useNavigate();

  const { data: dataNote } = useQuery(GET_NOTE, { variables: { id } });
  const { data: dataUser } = useQuery(GET_ME, {
    variables: { offset: 0, limit: 0 },
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: { id },
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
      cache.evict({
        id: cache.identify(dataUser?.me),
        fieldName: "favorites",
      });
      cache.evict({
        id: cache.identify(dataUser?.me),
        fieldName: "totalFavorites",
      });
      cache.evict({
        id: cache.identify(dataNote?.note),
      });
    },
    onCompleted: () => {
      navigate(`/mynotes`, { replace: true });
    },
  });

  // console.log(dataUser);

  function deleteHandler() {
    deleteNote();
  }

  return (
    <>
      {dataUser && dataNote && dataUser?.me.id === dataNote?.note.author.id && (
        <>
          <Link to={`/edit/${dataNote?.note.id}`}>Edit</Link>
          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
      <div>{dataNote?.note.content}</div>

      {dataUser && dataNote && (
        <FavoriteNote user={dataUser.me} note={dataNote.note} />
      )}
    </>
  );
}
