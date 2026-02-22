import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 md:p-8">
        <Outlet />
      </div>
    </div>
  );
}