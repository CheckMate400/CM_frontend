import { useState } from 'react';

function NewProject() {
  const [formData, setFormData] = useState({
    project_name: '',
    subject: '',
    num_questions: '',
    num_tests: '',
    project_type: 'open',
    expected_average: '',
  });

  const [solutionFile, setSolutionFile] = useState(null);
  const [testFiles, setTestFiles] = useState([]);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '') {
        data.append(key, value);
      }
    });

    if (solutionFile) {
      data.append('solution_file', solutionFile);
    }

    for (const file of testFiles) {
      data.append('test_files', file);
    }

    try {
      const response = await fetch('https://cm-backend-8k6b.onrender.com/create_project/', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setStatus(`Project Created: ${result.project_id}`);
      } else {
        setStatus(` Error: ${result.error || 'Unknown'}`);
      }
    } catch (err) {
      setStatus(` Request failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">יצירת פרויקט חדש</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input className="w-full border p-2" name="project_name" placeholder="שם הפרויקט" onChange={handleChange} required />
        <input className="w-full border p-2" name="subject" placeholder="נושא" onChange={handleChange} required />
        <input className="w-full border p-2" name="num_questions" type="number" placeholder="מספר שאלות" onChange={handleChange} required />
        <input className="w-full border p-2" name="num_tests" type="number" placeholder="מספר מבחנים" onChange={handleChange} required />

        <select className="w-full border p-2" name="project_type" onChange={handleChange}>
          <option value="open">שאלות פתוחות</option>
          <option value="multichoice">רב ברירה</option>
          <option value="homework">עבודת בית</option>
        </select>

        <input className="w-full border p-2" name="expected_average" type="number" placeholder="ממוצע צפוי (לא חובה)" onChange={handleChange} />

        <label className="block">קובץ פתרון (לא חובה)</label>
        <input className="w-full" type="file" accept="application/pdf" onChange={(e) => setSolutionFile(e.target.files[0])} />

        <label className="block">קבצי מבחנים (חובה)</label>
        <input className="w-full" type="file" accept="application/pdf" multiple onChange={(e) => setTestFiles([...e.target.files])} required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">שלח</button>
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}

export default NewProject;
