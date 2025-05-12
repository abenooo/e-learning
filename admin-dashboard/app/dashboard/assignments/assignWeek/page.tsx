"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { CalendarCheck2 } from "lucide-react"

export default function AssignWeekPage() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedPhase: "",
    selectedWeek: "",
    selectedClass: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <CalendarCheck2 className="text-orange-500" />
        Assign Week
      </h1>

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
            <option value="">-- Choose Course --</option>
            <option value="Course1">Course 1</option>
            <option value="Course2">Course 2</option>
          </select>
        </div>

        {/* Select Phase */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Phase</label>
          <select
            name="selectedPhase"
            value={formData.selectedPhase}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">-- Choose Phase --</option>
            <option value="Phase1">Phase 1</option>
            <option value="Phase2">Phase 2</option>
          </select>
        </div>

        {/* Select Week */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Week</label>
          <select
            name="selectedWeek"
            value={formData.selectedWeek}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">-- Choose Week --</option>
            <option value="Week1">Week 1</option>
            <option value="Week2">Week 2</option>
          </select>
        </div>

        {/* Select Class */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Class</label>
          <select
            name="selectedClass"
            value={formData.selectedClass}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">-- Choose Class --</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
          </select>
        </div>

        {/* Assign Week Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Assign Week
          </button>
        </div>
      </form>
    </div>
  )
}
