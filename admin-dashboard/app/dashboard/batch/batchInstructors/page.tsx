"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { UserPlus } from "lucide-react"

export default function CreateBatchInstructorPage() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    className: "",
    instructor: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        Assign Batch Instructor
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
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Course</option>
            <option value="Fullstack Web Application Development">
              Fullstack Web Application Development
            </option>
          </select>
        </div>

        {/* Select Batch */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Batch</label>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Batch</option>
            <option value="June-2024">June-2024</option>
          </select>
        </div>

        {/* Choose Class */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Class Name</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="e.g. Frontend Essentials"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Choose Instructor */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Instructor</label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Enter instructor name"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Save & Next →
          </button>
        </div>
      </form>
    </div>
  )
}
