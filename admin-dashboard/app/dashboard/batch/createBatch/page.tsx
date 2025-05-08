"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Layers } from "lucide-react"

export default function CreateBatchPage() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    selectedCourse: "",
    batchName: "",
    description: "",
    liveClassDays: "",
    liveClassHourStart: "",
    liveClassHourEnd: "",
    batchFullName: "",
    startDate: "",
    endDate: "",
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
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
        <Layers className="text-orange-500" />
        Create Batch
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

      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-5 text-sm">
        {/* Course Selection */}
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

        {/* Batch Name */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Batch Name</label>
          <input
            type="text"
            name="batchName"
            value={formData.batchName}
            onChange={handleChange}
            placeholder="e.g. June-2024"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter batch description"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Live Class Days & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Live Class Days</label>
            <select
              name="liveClassDays"
              value={formData.liveClassDays}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Days</option>
              <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
              <option value="Tue, Thu">Tue, Thu</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-300">Live Class Hour</label>
            <div className="flex gap-2">
              <input
                type="time"
                name="liveClassHourStart"
                value={formData.liveClassHourStart}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
              />
              <input
                type="time"
                name="liveClassHourEnd"
                value={formData.liveClassHourEnd}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Batch Full Name */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Batch Full Name</label>
          <input
            type="text"
            name="batchFullName"
            value={formData.batchFullName}
            onChange={handleChange}
            placeholder="e.g. June 6th - 2024"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Start-End Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-slate-300">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>
        </div>

        {/* Upload Section */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Upload Batch Flyer</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="w-full p-2 bg-slate-800 border border-slate-600 text-white"
          />
          <p className="text-xs text-slate-500 mt-1">60×60 px. JPG, JPEG, PNG only. No text on image.</p>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Batch Full Schedule (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full p-2 bg-slate-800 border border-slate-600 text-white"
          />
          <p className="text-xs text-slate-500 mt-1">Less than 10 MB</p>
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
