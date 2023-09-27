import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_NOTES } from "../../graphql/query";
import Notes from "../../components/notes";
import Pagination from "../../components/pagination";
import "./index.css";

export default function Home() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);

  let currentPage = +params.get("page");
  if (!currentPage) currentPage = 1;

  const limit = 10;
  const offset = (currentPage - 1) * limit;

  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: { offset, limit },
  });

  return (
    <>
      <div>Home</div>
      {loading && <div className="loading">loading</div>}
      <Notes notes={data?.notes} />
      <Pagination total={data?.totalNotes} />
    </>
  );
}
