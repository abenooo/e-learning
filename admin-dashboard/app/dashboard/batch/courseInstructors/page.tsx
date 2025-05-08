"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { UserPlus } from "lucide-react"

export default function CourseInstructorPage() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedTeamMember: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const tabs = [
    { label: "Manage Batches", path: "/dashboard/batch/createBatch" },
    { label: "Manage Groups", path: "/dashboard/batch/createGroup" },
    { label: "Batch Instructors", path: "/dashboard/batch/batchInstructors" },
    { label: "Course Instructors", path: "/dashboard/batch/courseInstructors" },
  ]

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
        <UserPlus className="text-orange-500" />
        Course Instructor Assignment
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-slate-700 mb-6 text-sm font-semibold text-slate-400">
        {tabs.map(tab => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 transition-colors duration-200 ease-in-out ${
              pathname === tab.path
                ? "border-b-2 border-orange-500 text-orange-400"
                : "hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form */}
      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-5 text-sm">
        {/* Select Course */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Course</label>
          <select
            name="selectedCourse"
            value={formData.selectedCourse}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Course</option>
            <option value="Fullstack Web Application Development">
              Fullstack Web Application Development
            </option>
          </select>
        </div>

        {/* Select Team Member */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Team Member</label>
          <select
            name="selectedTeamMember"
            value={formData.selectedTeamMember}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Team Member</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        {/* Assign Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Assign as Instructor
          </button>
        </div>
      </form>
    </div>
  )
}
