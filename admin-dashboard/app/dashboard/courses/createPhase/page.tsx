"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { BookOpen } from "lucide-react"

export default function CreatePhasePage() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseName: "",
    phaseTitle: "",
    phaseUrl: "",
    description: "",
    icon: null as File | null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, icon: file }))
  }

  const tabs = [
    { label: "Course Detail", path: "/dashboard/courses/createCourse" },
    { label: "Create Phase", path: "/dashboard/courses/createPhase" },
    { label: "Create Week", path: "/dashboard/courses/createWeek" },
    { label: "Week Component", path: "/dashboard/courses/createWeekComponent" },
  ]

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <BookOpen className="text-orange-500" />
        Create Phase
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
        <div>
          <label className="block font-medium mb-1 text-slate-300">Course Title</label>
          <select
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select a course</option>
            <option value="Fullstack Web Application Development">Fullstack Web Application Development</option>
            {/* You can dynamically load more options here */}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Phase Name</label>
            <input
              name="phaseName"
              value={formData.phaseName}
              onChange={handleChange}
              placeholder="Phase-1"
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-slate-300">Phase Title</label>
            <input
              name="phaseTitle"
              value={formData.phaseTitle}
              onChange={handleChange}
              placeholder="Basic computer skills"
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Phase URL</label>
          <input
            name="phaseUrl"
            value={formData.phaseUrl}
            onChange={handleChange}
            placeholder="/basic-computer-skills"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter phase description"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Phase Icon</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileChange}
            className="text-white"
          />
          <p className="text-xs text-slate-400 mt-1">60×60 | jpg, jpeg, gif, png</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save & Create New Phase
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
