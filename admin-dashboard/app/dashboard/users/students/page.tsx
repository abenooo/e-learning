"use client"

import { useState } from "react"
import { GraduationCap } from "lucide-react"

export default function ListStudentsPage() {
  const [course, setCourse] = useState("all")
  const [studentType, setStudentType] = useState("all")
  const [batch, setBatch] = useState("all")
  const [accessType, setAccessType] = useState("all")
  const [phase, setPhase] = useState("any")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const students = [
    {
      id: 1,
      avatar: "/avatar1.png",
      name: "Liya Mekonnen",
      contact: "+251911223344",
      course: "fullstack web application",
      type: "scholarship",
      batch: "april-2025",
      access: "full",
      phase: "phase 1",
    },
    {
      id: 2,
      avatar: "/avatar2.png",
      name: "Samuel Desta",
      contact: "+251922334455",
      course: "aws",
      type: "paid",
      batch: "may-2025",
      access: "access only",
      phase: "no phase access",
    },
  ]

  const filteredStudents = students.filter(student => {
    return (
      (course === "all" || student.course === course) &&
      (studentType === "all" || student.type === studentType) &&
      (batch === "all" || student.batch === batch) &&
      (accessType === "all" || student.access === accessType) &&
      (phase === "any" || student.phase === phase) &&
      student.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  const totalStudents = filteredStudents.length

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <GraduationCap className="text-orange-500" />
        List of Students
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-sm">
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Course</label>
          <select
            value={course}
            onChange={e => setCourse(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="all">All</option>
            <option value="fullstack web application">Fullstack Web Application</option>
            <option value="mulesoft">MuleSoft</option>
            <option value="aws">AWS</option>
            <option value="database">Database</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Student Type</label>
          <select
            value={studentType}
            onChange={e => setStudentType(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="all">All</option>
            <option value="scholarship">Scholarship</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Batch</label>
          <select
            value={batch}
            onChange={e => setBatch(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="all">All</option>
            <option value="april-2025">April-2025</option>
            <option value="may-2025">May-2025</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Access Type</label>
          <select
            value={accessType}
            onChange={e => setAccessType(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="all">All</option>
            <option value="full">Full Access</option>
            <option value="access only">Access Only</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Phase</label>
          <select
            value={phase}
            onChange={e => setPhase(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="any">Any Phase</option>
            <option value="no phase access">No Phase Access</option>
            <option value="phase 1">Phase 1</option>
            <option value="phase 2">Phase 2</option>
            <option value="no phase 1 access">No Phase 1 Access</option>
            <option value="no phase 2 access">No Phase 2 Access</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-sm text-slate-400">Total Students: {totalStudents}</div>
        
      </div>
    <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <input
          type="text"
          placeholder="Search students"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-65 p-2 rounded bg-slate-800 border border-slate-600 text-white"
        />      
    </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-3 border-b border-slate-700">Avatar / Name</th>
              <th className="text-left p-3 border-b border-slate-700">Contact</th>
              <th className="text-left p-3 border-b border-slate-700">Course</th>
              <th className="text-left p-3 border-b border-slate-700">Batch</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-800">
                <td className="p-3 flex items-center gap-2">
                  <img src={student.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span>{student.name}</span>
                </td>
                <td className="p-3">{student.contact}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.batch}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-slate-400">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white"
        >
          Next
        </button>
      </div>
    </div>
  )
}
