const BACKEND_URL = "https://cm-backend-8k6b.onrender.com";

export async function fetchProjects() {
  try {
    const res = await fetch(`${BACKEND_URL}/projects`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Failed to fetch projects:", err);
    return [];
  }
}
