"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Layers } from "lucide-react"

export default function CreateGroupPage() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedBatch: "",
    groupName: "",
    description: "",
    classHoursEST: "",
    classHoursET: "",
    classDay: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      <h1 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
        <Layers className="text-orange-500" />
        Create Group
      </h1>

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

      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-5 text-sm">
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Course</label>
          <select
            name="selectedCourse"
            value={formData.selectedCourse}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Course</option>
            <option value="Course 1">Course 1</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Batch</label>
          <select
            name="selectedBatch"
            value={formData.selectedBatch}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Batch</option>
            <option value="Batch A">Batch A</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Group Name</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            placeholder="e.g. Group 1"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter group description"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Class Hours (EST)</label>
            <input
              type="time"
              name="classHoursEST"
              value={formData.classHoursEST}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-300">Class Hours (ET)</label>
            <input
              type="time"
              name="classHoursET"
              value={formData.classHoursET}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Class Day</label>
          <select
            name="classDay"
            value={formData.classDay}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Day</option>
            <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
            <option value="Tue, Thu">Tue, Thu</option>
          </select>
        </div>

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
