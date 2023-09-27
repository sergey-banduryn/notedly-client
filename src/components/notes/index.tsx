import { Link } from "react-router-dom";
import "./index.css";

export default function Notes({ notes }) {
  if (!notes) return null;
  return (
    <>
      <div className="notes__wrap">
        {notes.map((note) => {
          return (
            <Link to={"/note/" + note.id} key={note.id}>
              <article className="note">{note.content}</article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
