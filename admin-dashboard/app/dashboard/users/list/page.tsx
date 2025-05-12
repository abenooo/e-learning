"use client"

import { useState } from "react"
import { Users2 } from "lucide-react"

export default function ListUsersPage() {
  const [role, setRole] = useState("all")
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  // Dummy data (replace with real data from API)
  const users = [
    {
      id: 1,
      avatar: "/avatar1.png",
      name: "John Doe",
      role: "admin",
      contact: "+251912345678",
      address: "Addis Ababa",
      joinedDate: "2024-02-15",
    },
    {
      id: 2,
      avatar: "/avatar2.png",
      name: "Jane Smith",
      role: "instructor",
      contact: "+251987654321",
      address: "Bahir Dar",
      joinedDate: "2023-11-30",
    },
    // Add more users as needed
  ]

  const filteredUsers = users.filter(user => {
    return (
      (role === "all" || user.role === role) &&
      (filter === "all" || user.role === "team member") &&
      user.name.toLowerCase().includes(search.toLowerCase())
    )
  })

  const totalUsers = filteredUsers.length

  return (
    <div className="p-6 text-white">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Users2 className="text-orange-500" />
        List of Users
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
        <div>
          <label className="block font-medium mb-1 text-slate-300">Select Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="all">All Users</option>
            <option value="supper admin">Supper Admin</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="group instructor">Group Instructor</option>
            <option value="team member">Team Member</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1 text-slate-300">Filter Users</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          >
            <option value="all">All Users</option>
            <option value="team">Team</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium mb-1 text-slate-300">Search Users</label>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-2 rounded bg-slate-800 border border-slate-600 text-white"
          />
        </div>
      </div>

      {/* Total Users */}
      <div className="mb-4 text-sm text-slate-400">Total Users: {totalUsers}</div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="text-left p-3 border-b border-slate-700">Avatar / Name</th>
              <th className="text-left p-3 border-b border-slate-700">Contact</th>
              <th className="text-left p-3 border-b border-slate-700">Address</th>
              <th className="text-left p-3 border-b border-slate-700">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-800">
                <td className="p-3 flex items-center gap-2">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span>{user.name}</span>
                </td>
                <td className="p-3">{user.contact}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.joinedDate}</td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-slate-400">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-white"
        >
          Next
        </button>
      </div>
    </div>
  )
}
