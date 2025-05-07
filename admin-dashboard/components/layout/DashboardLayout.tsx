'use client'

import { useState, useEffect, useRef } from "react"
import {
  Hexagon, Search, Moon, Sun, LogOut, BookOpen, Layers,
  Users, Database, Shield, Activity, BarChart3, User, Menu,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { NavDropdown } from "@/components/layout/NavDropdown"
import { NavSubItem } from "@/components/layout/NavSubItem"
import { usePathname } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string;
      constructor(public width: number, public height: number) {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(100, 150, 255, 0.2)`
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > this.width) this.x = 0
        if (this.x < 0) this.x = this.width
        if (this.y > this.height) this.y = 0
        if (this.y < 0) this.y = this.height
      }
      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const renderFooter = () => (
    <footer className="mt-12 border-t border-slate-700/50 pt-10 pb-12 text-slate-400 text-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="text-center md:text-left">
          <p className="font-semibold text-slate-200">Advanced Technical Service Provider</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="text-center md:text-right space-y-1">
          <p>
            Developed by{" "}
            <a
              href="https://your-portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              Codex Team
            </a>
          </p>
          <p>
            Contact:{" "}
            <a
              href="mailto:advancestsp@gmail.com"
              className="hover:text-orange-400 transition-colors"
            >
              advancestsp@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />
      <div className="relative z-10 container mx-auto p-4">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-blue-400">Advanced Technical Service Provider</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
              <Search className="h-4 w-4 text-slate-400" />
              <input className="bg-transparent text-sm focus:outline-none placeholder:text-slate-500" placeholder="Search..." />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? <Moon /> : <Sun />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>Toggle theme</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-slate-700 text-orange-500">ST</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Layout */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-16"} bg-slate-950 rounded-xl p-4 shadow-md border border-slate-800 space-y-4`}>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                {isSidebarOpen && <span>Dashboard</span>}
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="w-5 h-5 text-white" />
              </Button>
            </div>

            {isSidebarOpen && (
              <>
                <NavDropdown icon={BookOpen} label="Course Management">
                  <NavSubItem label="Create Course" href="/dashboard/courses/createCourse" />
                  <NavSubItem label="Create Phase" href="/dashboard/courses/createPhase" />
                  <NavSubItem label="Create Week" href="/dashboard/courses/createWeek" />
                  <NavSubItem label="Create Week Component" href="/dashboard/courses/createWeekComponent" />
                </NavDropdown>

                <NavDropdown icon={Layers} label="Class Management">
                  <NavSubItem label="Create Class" href="/dashboard/classes/createClass" />
                  <NavSubItem label="Add Video" href="/dashboard/classes/addVideo" />
                  <NavSubItem label="Create Checklist" href="/dashboard/classes/createChecklist" />
                  <NavSubItem label="Create Class Component" href="/dashboard/classes/createClassComponent" />
                </NavDropdown>

                <NavDropdown icon={Users} label="Batch & Group Management">
                  <NavSubItem label="Create Batch" href="/dashboard/batch/createBatch" />
                  <NavSubItem label="Create Group" href="/dashboard/batch/createGroup" />
                  <NavSubItem label="Batch Instructors" href="/dashboard/batch/batchInstructors" />
                  <NavSubItem label="Course Instructors" href="/dashboard/batch/courseInstructors" />
                </NavDropdown>

                <NavDropdown icon={Database} label="Add Content Management">
                  <NavSubItem label="Add Week Content" href="/dashboard/content/addWeek" />
                  <NavSubItem label="Add Class Content" href="/dashboard/content/addClass" />
                </NavDropdown>

                <NavDropdown icon={User} label="Manage Assignments">
                  <NavSubItem label="Assign Week" href="/dashboard/assignments/assignWeek" />
                  <NavSubItem label="Batch Instructors" href="/dashboard/assignments/batchInstructors" />
                  <NavSubItem label="Course Instructors" href="/dashboard/assignments/courseInstructors" />
                </NavDropdown>

                <NavDropdown icon={Shield} label="User Management">
                  <NavSubItem label="List of Users" href="/dashboard/users/list" />
                  <NavSubItem label="List of Students" href="/dashboard/users/students" />
                  <NavSubItem label="Group Confirmation" href="/dashboard/users/groupConfirmation" />
                </NavDropdown>

                <NavDropdown icon={Activity} label="Session Management">
                  <NavSubItem label="Live Session" href="/dashboard/sessions/live" />
                  <NavSubItem label="Group Session" href="/dashboard/sessions/group" />
                </NavDropdown>

                <NavDropdown icon={BarChart3} label="Report Management">
                  <NavSubItem label="Checklist" href="/dashboard/reports/checklist" />
                  <NavSubItem label="Watched" href="/dashboard/reports/watched" />
                  <NavSubItem label="Attendance" href="/dashboard/reports/attendance" />
                  <NavSubItem label="Completion" href="/dashboard/reports/completion" />
                  <NavSubItem label="Weekly Report" href="/dashboard/reports/weekly" />
                </NavDropdown>
              </>
            )}

            {/* === Bottom User + Logout Section === */}
            <div className="mt-6">
              <div className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/10 hover:bg-slate-800/50 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/user.jpg" alt="User" />
                    <AvatarFallback className="bg-slate-700 text-orange-500">ST</AvatarFallback>
                  </Avatar>
                  {isSidebarOpen && (
                    <div className="text-sm text-slate-300 font-medium">Your Name</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-500"
                  onClick={() => {
                    console.log("Logging out...")
                  }}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
            {renderFooter()}
          </main>
        </div>
      </div>
    </div>
  )
}
