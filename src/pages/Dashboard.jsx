import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const BACKEND_URL = "https://YOUR-BACKEND-URL/statistics"; // 👈 Replace with your actual Render URL

const dummyGrades = [95, 88, 76, 90, 85, 67, 59, 92, 74, 81];

const COLORS = ["#00ff99", "#33cc66", "#339966", "#666666", "#ff6666"];

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fakeStats = {
    average: 82.3,
    median: 85,
    std_dev: 10.1,
    grade_distribution: {
      "90-100": 3,
      "80-89": 4,
      "70-79": 2,
      "60-69": 1,
      "<60": 0,
    },
  };
  setStats(fakeStats);
  setLoading(false);
}, []);
  console.log("📊 Stats:", stats);


  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!stats) return <div className="text-red-500 p-6">No stats available</div>;

  const chartData = Object.entries(stats.grade_distribution).map(([gradeRange, count]) => ({
    name: gradeRange,
    value: count,
  }));

  return (
  <div className="min-h-screen bg-black text-green-400 p-6">
    <h1 className="text-3xl font-bold mb-6">📊 Dashboard is loading</h1>
    <pre>{JSON.stringify(stats, null, 2)}</pre>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Average" value={stats.average} />
        <StatCard title="Median" value={stats.median} />
        <StatCard title="Standard Deviation" value={stats.std_dev} />
      </div>

      <div className="bg-gray-900 p-4 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">Grade Distribution</h2>
        {/* <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx={200}
            cy={150}
            labelLine={false}
            label={({ name }) => name}
            outerRadius={100}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart> */}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-md text-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-3xl mt-2">{value}</div>
    </div>
  );
}

export default Dashboard;
