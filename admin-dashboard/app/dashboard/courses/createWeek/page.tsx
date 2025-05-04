"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

export default function CreateCourseWeekPage() {
  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekName: "",
    weekTitle: "",
    groupSession: "",
    liveSession: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Calendar className="text-orange-500" />
        Create Course Week
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-700 mb-6 text-sm font-semibold text-slate-400">
        <button className="hover:text-white">Create Course Detail</button>
        <button className="hover:text-white">Create Phase</button>
        <button className="pb-2 border-b-2 border-orange-500 text-orange-400">Create Week</button>
        <button className="hover:text-white">Create Week Component</button>
      </div>

      {/* Form Card */}
      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-5 text-sm">
        {/* Course Title */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Course Title</label>
          <select
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Course Title</option>
            <option value="Fullstack Web Application Development">Fullstack Web Application Development</option>
          </select>
        </div>

        {/* Selected Phase */}
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

        {/* Week Name */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Week Name</label>
          <input
            name="weekName"
            value={formData.weekName}
            onChange={handleChange}
            placeholder="Week 1"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Week Title */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Week Title</label>
          <input
            name="weekTitle"
            value={formData.weekTitle}
            onChange={handleChange}
            placeholder="Basic computer skills week"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Group Sessions */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Group Sessions</label>
          <select
            name="groupSession"
            value={formData.groupSession}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Group Sessions</option>
            <option value="Session A">Session A</option>
            <option value="Session B">Session B</option>
          </select>
        </div>

        {/* Live Sessions */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Live Sessions</label>
          <select
            name="liveSession"
            value={formData.liveSession}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Live Sessions</option>
            <option value="Live Session 1">Live Session 1</option>
            <option value="Live Session 2">Live Session 2</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save & Create New Week +
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
  );
}
