"use client"

import {
  Command,
  BookOpen,
  Book,
  Layers,
  Users,
  Database,
  User,
  Shield,
  Activity,
  BarChart3,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { NavItem } from "./NavItem"
import { NavDropdown } from "./NavDropdown"
import { NavSubItem } from "./NavSubItem"
import { StatusItem } from "./StatusItem"

export function Sidebar() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <nav className="space-y-2">
          <NavItem icon={Command} label="Dashboard" active />

          <NavDropdown icon={BookOpen} label="Courses">
            <NavSubItem label="Create Course" href="/courses/create" />
            <NavSubItem label="Create Phase" href="#" />
            <NavSubItem label="Create Week" href="#" />
            <NavSubItem label="Create Week Component" href="#" />
          </NavDropdown>

          <NavDropdown icon={Layers} label="Classes">
            <NavSubItem label="Create Class" href="/classes/create" />
            <NavSubItem label="Add Video" href="#" />
            <NavSubItem label="Add Live Video" href="#" />
            <NavSubItem label="Create Checklist" href="#" />
            <NavSubItem label="Create Class Component" href="#" />
          </NavDropdown>

          <NavDropdown icon={Users} label="Batch & Group">
            <NavSubItem label="Create Batch" href="#" />
            <NavSubItem label="Create Group" href="#" />
            <NavSubItem label="Batch Instructors" href="#" />
            <NavSubItem label="Course Instructors" href="#" />
          </NavDropdown>

          <NavDropdown icon={Database} label="Add Content">
            <NavSubItem label="Add Week Content" href="#" />
            <NavSubItem label="Add Class Content" href="#" />
          </NavDropdown>

          <NavDropdown icon={User} label="Assign">
            <NavSubItem label="Assign Week" href="#" />
            <NavSubItem label="Batch Instructors" href="#" />
            <NavSubItem label="Course Instructors" href="#" />
          </NavDropdown>

          <NavDropdown icon={Shield} label="User Hub">
            <NavSubItem label="List of Users" href="#" />
            <NavSubItem label="List of Students" href="#" />
            <NavSubItem label="Group Confirmation" href="#" />
          </NavDropdown>

          <NavDropdown icon={Activity} label="Sessions">
            <NavSubItem label="Live Session" href="#" />
            <NavSubItem label="Group Session" href="#" />
          </NavDropdown>

          <NavDropdown icon={BarChart3} label="Reports">
            <NavSubItem label="Checklist" href="#" />
            <NavSubItem label="Watched" href="#" />
            <NavSubItem label="Attendance" href="#" />
            <NavSubItem label="Completion" href="#" />
            <NavSubItem label="Weekly Report" href="#" />
          </NavDropdown>
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
          <div className="space-y-3">
            <StatusItem label="Core Systems" value={83} color="orange" />
            <StatusItem label="Security" value={75} color="green" />
            <StatusItem label="Network" value={86} color="blue" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
