// api/projects.js

export async function sendProject(formData) {
    const BACKEND_URL = "https://cm-backend-8k6b.onrender.com";
  
    try {
      const response = await fetch(`${BACKEND_URL}/projects/create`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("❌ Error sending project:", err);
      throw err;
    }
  }
  