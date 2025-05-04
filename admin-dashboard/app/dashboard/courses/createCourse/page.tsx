"use client";

import { useState } from "react";
import { Book, BookOpen, Layers } from "lucide-react";

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    path: "",
    payment: "Free",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Book className="text-orange-500" />
        Create Course
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-slate-700 mb-6 text-sm font-semibold text-slate-400">
        <button className="pb-2 border-b-2 border-orange-500 text-orange-400">
          Course Detail
        </button>
        <button className="hover:text-white">Create Phase</button>
        <button className="hover:text-white">Create Week</button>
        <button className="hover:text-white">Week Component</button>
      </div>

      {/* Form */}
      <form className="bg-slate-900/50 p-6 rounded shadow border border-slate-700/50 space-y-5 text-sm">
        <div>
          <label className="block font-medium mb-1 text-slate-300">
            Course Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Full Stack Development"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">
            Course Duration
          </label>
          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 months"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe the course..."
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">
            Course Icon
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            className="text-white"
          />
          <p className="text-xs text-slate-400 mt-1">
            60×60 | jpg, jpeg, gif, png
          </p>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">
            Course Path
          </label>
          <input
            name="path"
            value={formData.path}
            onChange={handleChange}
            placeholder="/full-stack"
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">
            Payment Status
          </label>
          <div className="flex gap-6 mt-2 text-slate-400">
            <label>
              <input
                type="radio"
                name="payment"
                value="Free"
                checked={formData.payment === "Free"}
                onChange={handleChange}
                className="mr-1"
              />
              Free
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Paid"
                checked={formData.payment === "Paid"}
                onChange={handleChange}
                className="mr-1"
              />
              Paid
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save & Create New
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
