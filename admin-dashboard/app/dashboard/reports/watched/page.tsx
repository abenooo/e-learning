"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Video,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";

export default function CreateChecklistPage() {
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    phase: "",
    group: "",
    topic: "",
  });

  const [students, setStudents] = useState([
    {
      name: "Rahel Adane",
      email: "rahelina24@gmail.com",
      id: "24516",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "LS-1",
    },
    {
      name: "Abubakr Muhammad",
      email: "bukar1601@gmail.com",
      id: "26604",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "LS-1",
    },
    // Add more students as needed
  ]);

  const [checklistItems, setChecklistItems] = useState([
    { topic: "Introduction", status: "read" },
    { topic: "HTML", status: "done" },
    { topic: "CSS", status: "read" },
  ]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (
      formData.course &&
      formData.batch &&
      formData.phase &&
      formData.group
    ) {
      alert("Checklist Created!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.course === formData.course &&
      student.batch === formData.batch &&
      student.phase === formData.phase &&
      student.group === formData.group
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
              <BarChart3 className="text-orange-500" />
              CWatched Class Video
            </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 text-sm">
        <select
          name="course"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Course</option>
          <option value="fullstack">Fullstack Web Application</option>
          <option value="mulesoft">MuleSoft</option>
          <option value="aws">AWS</option>
          <option value="database">Database</option>
        </select>
        <select
          name="batch"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Batch</option>
          <option value="april-2025">April-2025</option>
          <option value="may-2025">May-2025</option>
        </select>
        <select
          name="phase"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Phase</option>
          <option value="phase 1">Phase 1</option>
          <option value="phase 2">Phase 2</option>
          <option value="phase 3">Phase 3</option>
        </select>
        <select
          name="group"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Group</option>
          <option value="LS-1">GS-1</option>
          <option value="LS-2">GS-2</option>
        </select>
        <select
          name="topic"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Topic</option>
          <option value="Introduction">Introduction</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
        </select>
      </div>

      {/* Total Students */}
      <div className="mb-4">
        <strong>Total Students: {filteredStudents.length}</strong>
      </div>

      {/* Table */}
      <div className="bg-slate-900/50 border border-slate-700 rounded p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="p-2">User Profile</th>
              <th className="p-2">Watched Video</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr key={idx} className="border-b border-slate-800">
                <td className="p-2 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-700 text-white rounded-full text-sm font-semibold">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-slate-400">
                      {student.email}
                    </div>
                    <div className="text-xs text-slate-500">{student.id}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex gap-2 flex-wrap">
                    {checklistItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const newItems = [...checklistItems];
                          newItems[i].status =
                            newItems[i].status === "done" ? "read" : "done";
                          setChecklistItems(newItems);
                        }}
                        className={`p-1.5 rounded-full ${
                          item.status === "done"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.status === "done" ? (
                          <CheckCircle size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center gap-1 px-3 py-1 border border-slate-700 rounded text-slate-400 hover:text-white">
          <ChevronLeft size={16} /> Previous
        </button>
        <button className="flex items-center gap-1 px-3 py-1 border border-slate-700 rounded text-slate-400 hover:text-white">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
