"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { LayoutTemplate } from "lucide-react"

export default function CreateClassPage() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { label: "Create Class", path: "/dashboard/classes/createClass" },
    { label: "Create Class Video", path: "/dashboard/classes/addVideo" },
    { label: "Create Checklist Item", path: "/dashboard/classes/createChecklist" },
    { label: "Create Class Component", path: "/dashboard/classes/createClassComponent" },
  ]

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekTitle: "",
    topic: "",
    description: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <LayoutTemplate className="text-orange-500" />
        Create Class
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-slate-700 mb-6 text-sm font-semibold text-slate-400">
        {tabs.map(tab => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 ${
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
        {/* Row 1: Course & Phase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Course Title</label>
            <select
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select a course</option>
              <option value="Fullstack Web Application Development">
                Fullstack Web Application Development
              </option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-slate-300">Phase Title</label>
            <select
              name="phaseTitle"
              value={formData.phaseTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select a phase</option>
              <option value="Phase 1: Building static websites using HTML, CSS & Bootstrap">
                Phase 1: Building static websites using HTML, CSS & Bootstrap
              </option>
            </select>
          </div>
        </div>

        {/* Row 2: Week & Topic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Week Name</label>
            <select
              name="weekTitle"
              value={formData.weekTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select week</option>
              <option value="Course Preparation Week: Before you start the class">
                Course Preparation Week: Before you start the class
              </option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-slate-300">Class Topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g. Basic computer skills - part I"
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            placeholder="Enter topic description"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
          <p className="text-xs text-slate-500 mt-1">You can format with rich text if needed.</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
          >
            Save & Create New Class +
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
          >
            Save & Next →
          </button>
        </div>
      </form>
    </div>
  )
}
