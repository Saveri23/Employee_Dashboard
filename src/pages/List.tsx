import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
export default function List() {
  const [employees, setEmployees] = useState<any[]>([]);
  const navigate = useNavigate();
const [loading, setLoading] = useState(true);
 useEffect(() => {
  fetchEmployees().then((data) => {
    console.log("API RESPONSE:", data);

    const raw = data.TABLE_DATA.data;

    const formatted = raw.map((item: any[]) => ({
      id: item[0],
      name: item[1],
      city: item[2],
      salary: item[3],
      phone: item[4],
      email: item[5],
    }));

    setEmployees(formatted);
    setLoading(false);
  });
}, []);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-dark mb-6">
        Employee Dashboard
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => navigate("/chart")}
          className="bg-primary text-white px-5 py-3 rounded-xl shadow-premium hover:scale-105 transition"
        >
          📊 View Bar Graph
        </button>

        <button
          onClick={() => navigate("/map")}
          className="bg-secondary text-white px-5 py-3 rounded-xl shadow-premium hover:scale-105 transition"
        >
          🗺 View Map
        </button>
      </div>

     {loading ? <Loader /> : ( <div className="grid gap-4">
        {employees.map((emp, index) => (
          <div
            key={index}
            onClick={() => navigate(`/details/${index}`, { state: emp })}
            className="bg-white p-5 rounded-2xl shadow-premium hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-dark">
                  {emp.name}
                </h3>
                <p className="text-gray-500">{emp.city}</p>
              </div>

              <div className="text-right">
                <p className="text-primary font-semibold">
                  ₹ {emp.salary}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
     )}
    </div>
  );
}