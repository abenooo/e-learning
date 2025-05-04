"use client";

import { useState } from "react";
import { LayoutList } from "lucide-react";

export default function CreateWeekComponentPage() {
  const [formData, setFormData] = useState({
    courseTitle: "",
    phaseTitle: "",
    weekTitle: "",
    iconType: "",
    componentTitle: "",
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
        <LayoutList className="text-orange-500" />
        Create Week Component
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-700 mb-6 text-sm font-semibold text-slate-400">
        <button className="hover:text-white">Create Course Detail</button>
        <button className="hover:text-white">Create Phase</button>
        <button className="hover:text-white">Create Week</button>
        <button className="pb-2 border-b-2 border-orange-500 text-orange-400">Create Week Component</button>
      </div>

      {/* Form */}
      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-5 text-sm">
        {/* Course Title */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Selected Course</label>
          <select
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="">Select Course</option>
            <option value="Fullstack Web Application Development">Fullstack Web Application Development</option>
          </select>
        </div>

        {/* Phase Title */}
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

        {/* Week Title */}
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

        {/* Add Week Component */}
        <div>
          <p className="text-slate-300 font-medium mb-2">Add Week Component</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Icon Type */}
            <div>
              <label className="block font-medium mb-1 text-slate-300">Icon Type</label>
              <select
                name="iconType"
                value={formData.iconType}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
              >
                <option value="">Select Icon</option>
                <option value="Video">Video</option>
                <option value="Quiz">Quiz</option>
                <option value="PDF">PDF</option>
                <option value="Assignment">Assignment</option>
              </select>
            </div>

            {/* Component Title */}
            <div>
              <label className="block font-medium mb-1 text-slate-300">Component Title</label>
              <input
                name="componentTitle"
                value={formData.componentTitle}
                onChange={handleChange}
                placeholder="Todo list: Enter component title"
                className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save & Create +
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
