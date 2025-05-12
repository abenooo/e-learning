"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";

export default function CompletionPercentagePage() {
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    group: "",
    scope: "",
    phase: "",
    week: "",
  });

  const [students, setStudents] = useState([
    {
      name: "Rahel Adane",
      email: "rahelina24@gmail.com",
      id: "24516",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "GS-1",
      week: "week 1: introduction",
      completion: {
        video: 90,
        checklist: 80,
        liveClass: 100,
        group: 70,
      },
    },
    {
      name: "Abubakr Muhammad",
      email: "bukar1601@gmail.com",
      id: "26604",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "GS-1",
      week: "week 1: introduction",
      completion: {
        video: 100,
        checklist: 90,
        liveClass: 100,
        group: 90,
      },
    },
  ]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredStudents = students.filter(
    (s) =>
      s.course === formData.course &&
      s.batch === formData.batch &&
      s.group === formData.group &&
      s.phase === formData.phase &&
      s.week === formData.week
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
              <BarChart3 className="text-orange-500" />
              Completion Percentage
            </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm mb-6">
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
          name="group"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Group</option>
          <option value="GS-1">GS-1</option>
          <option value="GS-2">GS-2</option>
        </select>

        <select
          name="scope"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Scope</option>
          <option value="per phase">Per Phase</option>
          <option value="per week">Per Week</option>
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
          name="week"
          onChange={handleChange}
          className="p-2 bg-slate-800 border border-slate-600 rounded"
        >
          <option value="">Select Week</option>
          <option value="week 1: introduction">Week 1: Introduction</option>
          <option value="week 2: CSS">Week 2: CSS</option>
          <option value="week 3: HTML">Week 3: HTML</option>
        </select>
      </div>

      <div className="mb-4">
        <strong>Total Students: {filteredStudents.length}</strong>
      </div>

      <div className="overflow-x-auto bg-slate-900/50 border border-slate-700 rounded p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="p-2">User Profile</th>
              <th className="p-2">Watched Video</th>
              <th className="p-2">Checklist</th>
              <th className="p-2">Live Class Attendance</th>
              <th className="p-2">Group Attendance</th>
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
                    <div className="text-xs text-slate-400">{student.email}</div>
                    <div className="text-xs text-slate-500">{student.id}</div>
                  </div>
                </td>
                <td className="p-2">{student.completion.video}%</td>
                <td className="p-2">{student.completion.checklist}%</td>
                <td className="p-2">{student.completion.liveClass}%</td>
                <td className="p-2">{student.completion.group}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4 justify-center items-center">
        <ChevronLeft className="cursor-pointer text-green-500" />
        <div className="text-sm text-slate-400">Page 1 of 5</div>
        <ChevronRight className="cursor-pointer text-green-500" />
      </div>
    </div>
  );
}
