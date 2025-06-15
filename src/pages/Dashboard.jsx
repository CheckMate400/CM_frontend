import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api/projects_get";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-white p-6">טוען נתונים...</div>;

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <h1 className="text-3xl font-bold mb-6">📊 לוח ניהול הפרויקטים</h1>

      {projects.length === 0 ? (
        <p>לא נמצאו פרויקטים</p>
      ) : (
        <div className="space-y-6">
          {projects.map((proj) => (
            <div
              key={proj.project_id}
              className="bg-gray-900 p-4 rounded-2xl shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{proj.project_name}</h2>
              <p>נושא: {proj.subject}</p>
              <p>מספר מבחנים: {proj.num_tests}</p>
              <p>מספר שאלות: {proj.num_questions}</p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <StatCard title="ממוצע" value={proj.stats.average} />
                <StatCard title="חציון" value={proj.stats.median} />
                <StatCard title="סטיית תקן" value={proj.stats.std_dev} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-gray-800 p-3 rounded-xl text-center">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-2xl mt-1">{value}</div>
    </div>
  );
}

export default Dashboard;
