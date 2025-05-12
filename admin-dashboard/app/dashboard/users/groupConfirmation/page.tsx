"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

export default function GroupConfirmationPage() {
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    accessType: "",
    group: "",
  });

  const handleFilterChange = (e: { target: { name: any; value: any; }; }) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Users className="text-orange-500" />
        Group Confirmation
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 text-sm">
        <select
          name="course"
          value={filters.course}
          onChange={handleFilterChange}
          className="p-2 rounded bg-slate-800 border border-slate-600 text-white"
        >
          <option value="">Select Course</option>
          <option value="Fullstack Web Application">Fullstack Web Application</option>
          <option value="MuleSoft">MuleSoft</option>
          <option value="AWS">AWS</option>
          <option value="Database">Database</option>
        </select>

        <select
          name="batch"
          value={filters.batch}
          onChange={handleFilterChange}
          className="p-2 rounded bg-slate-800 border border-slate-600 text-white"
        >
          <option value="">Select Batch</option>
          <option value="April-2025">April-2025</option>
          <option value="May-2025">May-2025</option>
        </select>

        <select
          name="accessType"
          value={filters.accessType}
          onChange={handleFilterChange}
          className="p-2 rounded bg-slate-800 border border-slate-600 text-white"
        >
          <option value="">Access Type</option>
          <option value="Full Access">Full Access</option>
          <option value="Access Only">Access Only</option>
        </select>

        <select
          name="group"
          value={filters.group}
          onChange={handleFilterChange}
          className="p-2 rounded bg-slate-800 border border-slate-600 text-white"
        >
          <option value="">Select Group</option>
          <option value="Group 1">Group 1</option>
          <option value="Group 2">Group 2</option>
          <option value="Group 3">Group 3</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/50 p-4 rounded shadow border border-slate-700/50 text-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="p-2">User</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Requested Group</th>
              <th className="p-2">Confirm</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr className="border-b border-slate-800 hover:bg-slate-800/40">
              <td className="p-2 flex items-center gap-2">
                <img src="/avatar.png" className="w-8 h-8 rounded-full" alt="avatar" />
                <div>
                  <div className="font-medium text-white">John Doe</div>
                  <div className="text-xs text-slate-400">john@example.com</div>
                </div>
              </td>
              <td className="p-2">+251912345678</td>
              <td className="p-2">Group 1</td>
              <td className="p-2">
                <button className="bg-green-600 hover:bg-green-700 px-3 py-1 text-white rounded text-xs">
                  Confirm
                </button>
                <button className="ml-2 bg-yellow-600 hover:bg-yellow-700 px-3 py-1 text-white rounded text-xs">
                  Unconfirm
                </button>
              </td>
              <td className="p-2">
                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 text-white rounded text-xs">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 mt-6">
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700">
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button className="flex items-center gap-1 px-3 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
