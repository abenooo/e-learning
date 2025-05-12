"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FilePlus2 } from "lucide-react";

export default function AddWeekContentPage() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Add Week Content", path: "/dashboard/content/addWeek" },
    { label: "Add Class Content", path: "/dashboard/content/addClass" },
  ];

  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedPhase: "",
    selectedWeek: "",
    selectedComponent: "",
    contentTitle: "",
    iconType: "",
    contentType: "",
    description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
        <FilePlus2 className="text-orange-500" />
        Add Week Content
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <option value="Fullstack Web Dev">Fullstack Web Dev</option>
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
              <option value="">Select Phase</option>
              <option value="Phase 1">Phase 1</option>
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
              <option value="">Select Week</option>
              <option value="Week 1">Week 1</option>
              <option value="Week 2">Week 2</option>
            </select>
          </div>

          {/* Select Component */}
          <div>
            <label className="block font-medium mb-1 text-slate-300">Select Component</label>
            <select
              name="selectedComponent"
              value={formData.selectedComponent}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Select Component</option>
              <option value="Lecture">Lecture</option>
              <option value="Assignment">Assignment</option>
            </select>
          </div>
        </div>

        {/* Content Title */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Content Title</label>
          <input
            type="text"
            name="contentTitle"
            value={formData.contentTitle}
            onChange={handleChange}
            placeholder="e.g. Introduction to Git"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Icon Type & Content Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1 text-slate-300">Icon Type</label>
            <input
              type="text"
              name="iconType"
              value={formData.iconType}
              onChange={handleChange}
              placeholder="e.g. book, video"
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-slate-300">Content Type</label>
            <select
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
            >
              <option value="">Choose Type</option>
              <option value="Reading">Reading</option>
              <option value="Video">Video</option>
              <option value="Quiz">Quiz</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-slate-300">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter content description"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Save & Create New Content
          </button>
        </div>
      </form>
    </div>
  );
}
