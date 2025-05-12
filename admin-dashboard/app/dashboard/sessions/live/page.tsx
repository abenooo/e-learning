"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Video, Copy } from "lucide-react";

export default function CreateLiveSessionPage() {
  const [formData, setFormData] = useState({
    course: "",
    batch: "",
    phase: "",
    week: "",
    session: "",
    zoomLink: ""
  });

  const [sessions, setSessions] = useState([
    { createdBy: "Admin", sessionTitle: "Week 1 - Intro", batch: "April-2025", zoomLink: "https://zoom.us/abc", status: "Active" },
    { createdBy: "Admin", sessionTitle: "Week 2 - HTML", batch: "May-2025", zoomLink: "https://zoom.us/def", status: "Inactive" },
    // Example sessions
  ]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (formData.zoomLink && formData.course && formData.batch && formData.phase && formData.week && formData.session) {
      const newSession = {
        createdBy: "Admin",  // You can modify this to dynamically get the logged-in user
        sessionTitle: `${formData.week} - ${formData.course}`,
        batch: formData.batch,
        group: formData.session,
        zoomLink: formData.zoomLink,
        status: "Active"
      };
      setSessions([...sessions, newSession]); // Add the new session to the sessions array
      setFormData({ ...formData, zoomLink: "" }); // Clear the form after submission
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDelete = (index: number) => {
    setSessions(sessions.filter((_, i) => i !== index)); // Remove the session at the specified index
  };

  const handleStatusChange = (index: number) => {
    const updatedSessions = [...sessions];
    updatedSessions[index].status = updatedSessions[index].status === "Active" ? "Inactive" : "Active";
    setSessions(updatedSessions);
  };

  const handleCopyLink = (zoomLink: string) => {
    navigator.clipboard.writeText(zoomLink);
    alert("Zoom link copied to clipboard!");
  };

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Video className="text-orange-500" />
        Create Live Session
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
        <select name="course" onChange={handleChange} className="p-2 bg-slate-800 border border-slate-600 rounded">
          <option value="">Select Course</option>
          <option value="fullstack">Fullstack Web Application</option>
          <option value="mulesoft">MuleSoft</option>
          <option value="aws">AWS</option>
          <option value="database">Database</option>
        </select>

        <select name="batch" onChange={handleChange} className="p-2 bg-slate-800 border border-slate-600 rounded">
          <option value="">Select Batch</option>
          <option value="april-2025">April-2025</option>
          <option value="may-2025">May-2025</option>
        </select>

        <select name="phase" onChange={handleChange} className="p-2 bg-slate-800 border border-slate-600 rounded">
          <option value="">Select Phase</option>
          <option value="phase 1">Phase 1</option>
          <option value="phase 2">Phase 2</option>
          <option value="phase 3">Phase 3</option>
        </select>

        <select name="week" onChange={handleChange} className="p-2 bg-slate-800 border border-slate-600 rounded">
          <option value="">Select Week</option>
          <option value="week 1">Week 1: Introduction</option>
          <option value="week 2">Week 2: HTML</option>
          <option value="week 3">Week 3: CSS</option>
        </select>

        <select name="session" onChange={handleChange} className="p-2 bg-slate-800 border border-slate-600 rounded">
          <option value="">Select Live Session</option>
          <option value="LS-1">LS-1</option>
          <option value="LS-2">LS-2</option>
        </select>
      </div>

      {/* Zoom Link & Create Button in One Row */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          name="zoomLink"
          value={formData.zoomLink}
          onChange={handleChange}
          placeholder="Zoom Meeting Link"
          className="p-2 bg-slate-800 border border-slate-600 rounded w-full md:w-2/3"
        />
        <button
          onClick={handleCreate}
          className="bg-orange-500 hover:bg-orange-600 px-8 py-2 rounded text-white"
        >
          Create
        </button>
      </div>

      {/* Session Table */}
      <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
        <h2 className="text-lg font-semibold mb-4">Live Session Links</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-800 text-slate-400">
              <tr>
                <th className="px-4 py-2">Created By</th>
                <th className="px-4 py-2">Session Title</th>
                <th className="px-4 py-2">Batch</th>
                <th className="px-4 py-2">Live Session Link</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index} className="border-b border-slate-700">
                  <td className="px-4 py-2">{session.createdBy}</td>
                  <td className="px-4 py-2">{session.sessionTitle}</td>
                  <td className="px-4 py-2">{session.batch}</td>
                  <td className="px-4 py-2 text-blue-400 underline cursor-pointer relative">
                    <a href={session.zoomLink} target="_blank" rel="noopener noreferrer">
                      {session.zoomLink}
                    </a>
                    {/* Copy Zoom Link Button */}
                    {session.status === "Active" && (
                      <button 
                        className="absolute top-0 right-0 p-2 text-white bg-orange-500 rounded-full"
                        onClick={() => handleCopyLink(session.zoomLink)}
                      >
                        <Copy size={16} />
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      onClick={() => handleStatusChange(index)}
                      className={`cursor-pointer px-2 py-1 text-xs ${session.status === "Active" ? "bg-green-700" : "bg-red-700"} text-white rounded`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(index)} // Delete action
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button className="flex items-center gap-1 px-3 py-1 border border-slate-700 rounded text-slate-400 hover:text-white">
            <ChevronLeft size={16} /> Previous
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border border-slate-700 rounded text-slate-400 hover:text-white">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
