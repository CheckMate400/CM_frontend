import React, { useState } from "react";
import { sendProject } from "../api/projects";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [projectType, setProjectType] = useState("open");
  const [expectedAverage, setExpectedAverage] = useState("");
  const [solutionFile, setSolutionFile] = useState(null);
  const [testFiles, setTestFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("project_name", projectName);
    formData.append("subject", subject);
    formData.append("num_questions", numQuestions);
    formData.append("num_tests", testFiles.length);
    formData.append("project_type", projectType);
    if (expectedAverage) {
      formData.append("expected_average", expectedAverage);
    }
    formData.append("solution_file", solutionFile);
    for (let i = 0; i < testFiles.length; i++) {
      formData.append("test_files", testFiles[i]);
    }

    try {
      const data = await sendProject(formData);
      console.log("✅ Success:", data);
      alert("Project created successfully!");
    } catch (error) {
      console.error("❌ Failed to create project:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">צור פרויקט חדש</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="שם הפרויקט"
          className="w-full p-2 border"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="נושא"
          className="w-full p-2 border"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="מספר שאלות"
          className="w-full p-2 border"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          required
        />
        <select
          className="w-full p-2 border"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option value="open">מבחן פתוח</option>
          <option value="multichoice">אמריקאי</option>
          <option value="homework">עבודת בית</option>
        </select>
        <input
          type="number"
          placeholder="ממוצע צפוי (לא חובה)"
          className="w-full p-2 border"
          value={expectedAverage}
          onChange={(e) => setExpectedAverage(e.target.value)}
        />
        <label className="block">קובץ פתרון:</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setSolutionFile(e.target.files[0])}
          required
        />
        <label className="block">קבצי מבחנים:</label>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(e) => setTestFiles(Array.from(e.target.files))}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          שלח לבדיקה
        </button>
      </form>
    </div>
  );
};

export default NewProject;
