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

export default function ClassAndGroupAttendancePage() {
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
      attendance: {
        liveClassStatus: Array(8).fill(false), // Initial live class attendance state
        groupStatus: Array(8).fill(false),     // Initial group attendance state
      },
    },
    {
      name: "Abubakr Muhammad",
      email: "bukar1601@gmail.com",
      id: "26604",
      course: "fullstack",
      batch: "april-2025",
      phase: "phase 1",
      group: "LS-1",
      attendance: {
        liveClassStatus: Array(8).fill(true), // Initial live class attendance state
        groupStatus: Array(8).fill(true),     // Initial group attendance state
      },
    },
    // Add more students as needed
  ]);

  const [attendanceItems, setAttendanceItems] = useState([
    {
      topic: "Introduction",
    },
    {
      topic: "HTML",
    },
    {
      topic: "CSS",
    },
  ]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.course === formData.course &&
      student.batch === formData.batch &&
      student.phase === formData.phase &&
      student.group === formData.group
  );

  const toggleStatus = (
    studentIdx: number,
    type: string,
    index: number
  ) => {
    const newStudents = [...students];
    const statusArray =
      type === "liveClassStatus"
        ? newStudents[studentIdx].attendance.liveClassStatus
        : newStudents[studentIdx].attendance.groupStatus;
    statusArray[index] = !statusArray[index]; // Toggle between true and false to change color
    setStudents(newStudents);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
              <BarChart3 className="text-orange-500" />
              Class & Group Attendancege
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
              <th className="p-2">Live Class Attendance</th>
              <th className="p-2">Group Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, studentIdx) => (
              <tr key={studentIdx} className="border-b border-slate-800">
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
                    <div className="text-sm font-semibold text-slate-300">C1</div>
                    {Array(8)
                      .fill(false)
                      .map((_, index) => (
                        <button
                          key={`liveClass-C1-${studentIdx}-${index}`}
                          onClick={() =>
                            toggleStatus(studentIdx, "liveClassStatus", index)
                          }
                          className={`p-2 rounded-full ${
                            student.attendance.liveClassStatus[index]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {student.attendance.liveClassStatus[index] ? (
                            <CheckCircle size={18} />
                          ) : (
                            <XCircle size={18} />
                          )}
                        </button>
                      ))}
                    <div className="text-sm font-semibold text-slate-300">C2</div>
                    {Array(8)
                      .fill(false)
                      .map((_, index) => (
                        <button
                          key={`liveClass-C2-${studentIdx}-${index}`}
                          onClick={() =>
                            toggleStatus(studentIdx, "liveClassStatus", index)
                          }
                          className={`p-2 rounded-full ${
                            student.attendance.liveClassStatus[index]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {student.attendance.liveClassStatus[index] ? (
                            <CheckCircle size={18} />
                          ) : (
                            <XCircle size={18} />
                          )}
                        </button>
                      ))}
                  </div>
                </td>
                <td className="p-2">
                  <div className="flex gap-2 flex-wrap">
                    <div className="text-sm font-semibold text-slate-300"></div>
                    {Array(8)
                      .fill(false)
                      .map((_, index) => (
                        <button
                          key={`group-G1-${studentIdx}-${index}`}
                          onClick={() =>
                            toggleStatus(studentIdx, "groupStatus", index)
                          }
                          className={`p-2 rounded-full ${
                            student.attendance.groupStatus[index]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {student.attendance.groupStatus[index] ? (
                            <CheckCircle size={18} />
                          ) : (
                            <XCircle size={18} />
                          )}
                        </button>
                      ))}
                    <div className="text-sm font-semibold text-slate-300"></div>
                    {Array(8)
                      .fill(false)
                      .map((_, index) => (
                        <button
                          key={`group-G2-${studentIdx}-${index}`}
                          onClick={() =>
                            toggleStatus(studentIdx, "groupStatus", index)
                          }
                          className={`p-2 rounded-full ${
                            student.attendance.groupStatus[index]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {student.attendance.groupStatus[index] ? (
                            <CheckCircle size={18} />
                          ) : (
                            <XCircle size={18} />
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

      <div className="mt-4 flex gap-4 justify-center items-center">
        <ChevronLeft className="cursor-pointer text-orange-500" />
        <div className="text-sm text-slate-400">Page 1 of 5</div>
        <ChevronRight className="cursor-pointer text-orange-500" />
      </div>
    </div>
  );
}
