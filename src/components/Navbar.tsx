import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = (path: string) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-500 hover:text-indigo-500";

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b px-8 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-indigo-600 tracking-wide">
        EmployeePro
      </div>

      <div className="flex gap-8">
        <Link to="/list" className={active("/list")}>
          Dashboard
        </Link>
        <Link to="/chart" className={active("/chart")}>
          Analytics
        </Link>
        <Link to="/map" className={active("/map")}>
          Locations
        </Link>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("auth");
          navigate("/");
        }}
        className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}