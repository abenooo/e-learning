"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { ListChecks } from "lucide-react"

export default function CreateChecklistPage() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { label: "Create Class", path: "/dashboard/classes/createClass" },
    { label: "Create Class Video", path: "/dashboard/classes/createClassVideo" },
    { label: "Create Checklist Item", path: "/dashboard/classes/createChecklist" },
    { label: "Create Class Component", path: "/dashboard/classes/createClassComponent" },
  ]

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekTitle: "",
    classTitle: "",
    checklistTitle: "",
    briefNote: "",
    descriptionNote: "",
    referenceLink: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 text-white">
      {/* Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <ListChecks className="text-orange-500" />
        Create Checklist
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Create the class roadmap of your course with details.
      </p>

      {/* Tabs */}
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
      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-6 text-sm">
        {/* Row 1: Course and Phase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Selected Course</label>
            <select
              name="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Course</option>
              <option value="Fullstack Web Application Development">
                Fullstack Web Application Development
              </option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-slate-300">Selected Phase</label>
            <select
              name="phaseTitle"
              value={formData.phaseTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Phase</option>
              <option value="Phase 1: Building static websites using HTML, CSS & Bootstrap">
                Phase 1: Building static websites using HTML, CSS & Bootstrap
              </option>
            </select>
          </div>
        </div>

        {/* Row 2: Week and Class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Selected Week</label>
            <select
              name="weekTitle"
              value={formData.weekTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Week</option>
              <option value="Course Preparation Week: Before you start the class">
                Course Preparation Week: Before you start the class
              </option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1 text-slate-300">Selected Class Topic</label>
            <select
              name="classTitle"
              value={formData.classTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Class</option>
              <option value="Basic computer skills - part I">
                Basic computer skills - part I
              </option>
            </select>
          </div>
        </div>

        {/* Checklist Title */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Checklist Item Title</label>
          <input
            type="text"
            name="checklistTitle"
            value={formData.checklistTitle}
            onChange={handleChange}
            placeholder="Enter checklist item title as question?"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Brief HTML Note */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Brief HTML Note</label>
          <textarea
            name="briefNote"
            value={formData.briefNote}
            onChange={handleChange}
            placeholder="Enter checklist item brief html note"
            rows={6}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Description Note */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Description Note</label>
          <textarea
            name="descriptionNote"
            value={formData.descriptionNote}
            onChange={handleChange}
            placeholder="Enter checklist item description note (optional)"
            rows={6}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Reference Link */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Reference Link</label>
          <input
            type="text"
            name="referenceLink"
            value={formData.referenceLink}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=bqL4ZbLYeyY"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition"
          >
            Save & Create Checklist +
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
