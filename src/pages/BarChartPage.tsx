import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BarChartPage() {
  const [employees, setEmployees] = useState<any[]>([]);
useEffect(() => {
  fetchEmployees().then((data) => {
    const raw = data.TABLE_DATA.data;

    const formatted = raw.map((item: any[]) => ({
      name: item[1],
      salary: Number(item[3]),
    }));

    setEmployees(formatted.slice(0, 10));
  });
}, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Salary Bar Graph
      </h2>
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={employees}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="salary" fill="#6366f1" />
  </BarChart>
</ResponsiveContainer>
    </div>
  );
}