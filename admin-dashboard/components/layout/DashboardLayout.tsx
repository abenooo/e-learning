"use client"

import { useState, useEffect, useRef } from "react"
import {
  Hexagon,
  Search,
  Moon,
  Sun,
  LogOut,
  BookOpen,
  Layers,
  Users,
  Database,
  Shield,
  Activity,
  BarChart3,
  User,
  Menu,
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
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

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
            {/* Dashboard Label */}
            <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-400" />
                {isSidebarOpen && <span>Dashboard</span>}
              </div>
                          {/* ✅ Toggle button always visible */}
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="inline-flex">
              <Menu className="w-5 h-5 text-white" />
            </Button>
            </div>

            {/* Menu Items */}
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
                  <NavSubItem label="Add Video" href="#" />
                  <NavSubItem label="Add Live Video" href="#" />
                  <NavSubItem label="Create Checklist" href="#" />
                  <NavSubItem label="Create Class Component" href="#" />
                </NavDropdown>

                <NavDropdown icon={Users} label="Batch & Group Management">
                  <NavSubItem label="Create Batch" href="#" />
                  <NavSubItem label="Create Group" href="#" />
                  <NavSubItem label="Batch Instructors" href="#" />
                  <NavSubItem label="Course Instructors" href="#" />
                </NavDropdown>

                <NavDropdown icon={Database} label="Add Content Management">
                  <NavSubItem label="Add Week Content" href="#" />
                  <NavSubItem label="Add Class Content" href="#" />
                </NavDropdown>

                <NavDropdown icon={User} label="Manage Assignments">
                  <NavSubItem label="Assign Week" href="#" />
                  <NavSubItem label="Batch Instructors" href="#" />
                  <NavSubItem label="Course Instructors" href="#" />
                </NavDropdown>

                <NavDropdown icon={Shield} label="User Management">
                  <NavSubItem label="List of Users" href="#" />
                  <NavSubItem label="List of Students" href="#" />
                  <NavSubItem label="Group Confirmation" href="#" />
                </NavDropdown>

                <NavDropdown icon={Activity} label="Session Management">
                  <NavSubItem label="Live Session" href="#" />
                  <NavSubItem label="Group Session" href="#" />
                </NavDropdown>

                <NavDropdown icon={BarChart3} label="Report Management">
                  <NavSubItem label="Checklist" href="#" />
                  <NavSubItem label="Watched" href="#" />
                  <NavSubItem label="Attendance" href="#" />
                  <NavSubItem label="Completion" href="#" />
                  <NavSubItem label="Weekly Report" href="#" />
                </NavDropdown>
              </>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-between items-center border-t border-slate-800 pt-4">
              <div className={`text-sm text-slate-400 ${!isSidebarOpen ? "hidden" : ""}`}>Your Name</div>
              <Button variant="ghost" size="icon" onClick={() => console.log("Logout")}>
                <LogOut className="h-5 w-5 text-red-500 hover:text-red-600" />
              </Button>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
