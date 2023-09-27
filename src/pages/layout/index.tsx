import { Link, Outlet } from "react-router-dom";
import UserPanel from "../../components/userPanel";
import "./index.css";

export default function Layout() {
  return (
    <>
      <header>
        Header <UserPanel />
      </header>
      <div className="layout">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new">New note</Link>
          <Link to="/mynotes">My notes</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
