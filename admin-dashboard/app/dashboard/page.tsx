"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Book,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Command,
  Database,
  Hexagon,
  Layers,
  ListChecks,
  LogOut,
  Menu,
  Moon,
  Search,
  Shield,
  Sun,
  User,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavDropdown } from "@/components/layout/NavDropdown"
import { NavSubItem } from "@/components/layout/NavSubItem"
//import { StatusItem } from "@/components/layout/StatusItem"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(
          Math.random() * 100
        ) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
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
    const particleCount = 100
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const formatTime = (date: Date) => date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
  const formatDate = (date: Date) => date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 animate-spin-slower">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">SYSTEM INITIALIZING</div>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4 relative z-10">
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Hexagon className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Advanced Technical Service Provider
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-400 hover:text-slate-100">
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Avatar>
                <AvatarImage src="/user.jpg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-orange-500">ST</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`transition-all duration-300 ${isSidebarOpen ? "w-72" : "w-16"} flex-shrink-0`}>
            <div className="h-full bg-slate-950 border border-slate-800 rounded-xl flex flex-col justify-between overflow-hidden">
              {/* Top Section */}
              <div className="px-2 pt-2 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    {isSidebarOpen && <h2 className="text-sm font-semibold text-slate-100">Dashboard</h2>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-slate-100"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="flex-1 px-2 space-y-1 overflow-y-auto">
                <NavDropdown icon={BookOpen} label={isSidebarOpen ? "Course Management" : ""}>
                  <NavSubItem label="Create Course" href="dashboard/courses/createCourse" />
                  <NavSubItem label="Create Phase" href="dashboard/courses/createPhase" />
                  <NavSubItem label="Create Week" href="dashboard/courses/createWeek" />
                  <NavSubItem label="Create Week Component" href="dashboard/courses/createWeekComponent" />
                </NavDropdown>

                <NavDropdown icon={Layers} label={isSidebarOpen ? "Class Management" : ""}>
                  <NavSubItem label="Create Class" href="dashboard/classes/createClass" />
                  <NavSubItem label="Add Video" href="#" />
                  <NavSubItem label="Add Live Video" href="#" />
                  <NavSubItem label="Create Checklist" href="#" />
                  <NavSubItem label="Create Class Component" href="#" />
                </NavDropdown>

                <NavDropdown icon={Users} label={isSidebarOpen ? "Batch & Group Management" : ""}>
                  <NavSubItem label="Create Batch" href="#" />
                  <NavSubItem label="Create Group" href="#" />
                  <NavSubItem label="Batch Instructors" href="#" />
                  <NavSubItem label="Course Instructors" href="#" />
                </NavDropdown>

                <NavDropdown icon={Database} label={isSidebarOpen ? "Add Content Management" : ""}>
                  <NavSubItem label="Add Week Content" href="#" />
                  <NavSubItem label="Add Class Content" href="#" />
                </NavDropdown>

                <NavDropdown icon={User} label={isSidebarOpen ? "Manage Assignments" : ""}>
                  <NavSubItem label="Assign Week" href="#" />
                  <NavSubItem label="Batch Instructors" href="#" />
                  <NavSubItem label="Course Instructors" href="#" />
                </NavDropdown>

                <NavDropdown icon={Shield} label={isSidebarOpen ? "User Management" : ""}>
                  <NavSubItem label="List of Users" href="#" />
                  <NavSubItem label="List of Students" href="#" />
                  <NavSubItem label="Group Confirmation" href="#" />
                </NavDropdown>

                <NavDropdown icon={Activity} label={isSidebarOpen ? "Session Management" : ""}>
                  <NavSubItem label="Live Session" href="#" />
                  <NavSubItem label="Group Session" href="#" />
                </NavDropdown>

                <NavDropdown icon={BarChart3} label={isSidebarOpen ? "Report Management" : ""}>
                  <NavSubItem label="Checklist" href="#" />
                  <NavSubItem label="Watched" href="#" />
                  <NavSubItem label="Attendance" href="#" />
                  <NavSubItem label="Completion" href="#" />
                  <NavSubItem label="Weekly Report" href="#" />
                </NavDropdown>
                {/* === Bottom User + Logout Section === */}
                <div className="mt-6">
                  <div
                    className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/10 hover:bg-slate-800/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/user.jpg" alt="User" />
                        <AvatarFallback className="bg-slate-700 text-orange-500">ST</AvatarFallback>
                      </Avatar>
                      <div className="text-sm text-slate-300 font-medium">Your Name</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-red-500"
                      onClick={() => {
                        // 🔐 Add logout logic here
                        console.log("Logging out...")
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* Quick Links */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-orange-500" />
                      Quick Links
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50 text-xs">
                        Quick Access to Essential Tools and Resources!
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Course Management */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Book className="mr-2 h-5 w-5 text-orange-500" />
                      Course Management
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ManagementLink icon={BookOpen} label="All Courses" />
                    <ManagementLink icon={Book} label="Create Course" />
                    <ManagementLink icon={Book} label="Create Phase" />
                    <ManagementLink icon={Book} label="Create Week" />
                    <ManagementLink icon={Book} label="Create Week Component" />
                    <ManagementLink icon={Book} label="Add Week Content" />
                    <ManagementLink icon={Book} label="Supplementary Course Offerings" />
                    <ManagementLink icon={Book} label="Select Supplementary Course" />
                  </div>
                </CardContent>
              </Card>

              {/* Class Management & Batch Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-slate-700/50">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Layers className="mr-2 h-5 w-5 text-orange-500" />
                      Class Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink icon={Layers} label="Create Class" />
                      <ManagementLink icon={Video} label="Add Class Video" />
                      <ManagementLink icon={ListChecks} label="Create Checklist" />
                      <ManagementLink icon={Layers} label="Create Class Component" />
                      <ManagementLink icon={Database} label="Add Class Content" />
                      <ManagementLink icon={Book} label="Assign Week" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-slate-700/50">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Users className="mr-2 h-5 w-5 text-orange-500" />
                      Batch Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink icon={Users} label="Create Batch" />
                      <ManagementLink icon={Users} label="Create Group" />
                      <ManagementLink icon={Users} label="Assign Batch Instructors" />
                      <ManagementLink icon={Users} label="Assign Course Instructors" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* User Management & Session Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-slate-700/50">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <User className="mr-2 h-5 w-5 text-orange-500" />
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink icon={User} label="List Of Users" />
                      <ManagementLink icon={User} label="List Of Students" />
                      <ManagementLink icon={User} label="Confirm Group Request" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-slate-700/50">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Activity className="mr-2 h-5 w-5 text-orange-500" />
                      Session Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <ManagementLink icon={Activity} label="Create Live Session" />
                      <ManagementLink icon={Activity} label="Create Group Session" />
                      <ManagementLink icon={Video} label="Add Live Class Video" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Report Management */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 border-b border-slate-700/50">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                    Report Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ManagementLink icon={Video} label="Watched Videos" />
                    <ManagementLink icon={ListChecks} label="Checklist" />
                    <ManagementLink icon={Users} label="Attendance" />
                    <ManagementLink icon={ListChecks} label="Completion" />
                    <ManagementLink icon={BarChart3} label="Weekly Report" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="w-80">
            <div className="grid gap-6">
              {/* System time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                      <div className="text-3xl font-mono text-orange-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Uptime</div>
                        <div className="text-sm font-mono text-slate-200">14d 06:42:18</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Time Zone</div>
                        <div className="text-sm font-mono text-slate-200">UTC-08:00</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={Book} label="Create Course" />
                    <ActionButton icon={Layers} label="Create Class" />
                    <ActionButton icon={Users} label="Create Batch" />
                    <ActionButton icon={Video} label="Add Video" />
                  </div>
                </CardContent>
              </Card>

              {/* User Profile */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Shimels" />
                      <AvatarFallback className="bg-slate-700 text-orange-500 text-xl">ST</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-lg font-medium text-slate-100">Advanced TSP</div>
                      <div className="text-sm text-slate-400">advancestsp@gmail.com</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">Role</div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">Administrator</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">Last Login</div>
                      <div className="text-sm text-slate-300">Today, 10:30 AM</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-400">Status</div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Server Load</div>
                        <div className="text-xs text-orange-400">{cpuUsage}% utilized</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                          style={{ width: `${cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Database</div>
                        <div className="text-xs text-purple-400">{memoryUsage}% utilized</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: `${memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Storage</div>
                        <div className="text-xs text-blue-400">35% utilized</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <footer className="mt-12 border-t border-slate-700/50 pt-10 pb-12 text-slate-400 text-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <p className="font-semibold text-slate-200">Advanced Technical Service Provider</p>
              <p className="mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            {/* Right Section */}
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
                  href="mailto:contact@yourdomain.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  advancestsp@gmail.com
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-orange-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}
// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "orange":
        return "from-orange-500 to-amber-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-orange-500 to-amber-500"
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
// Component for management links
function ManagementLink({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <a
      href="#"
      className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-800/50 text-slate-300 hover:text-orange-400 transition-colors"
    >
      <Icon className="h-4 w-4 text-orange-500" />
      <span>{label}</span>
    </a>
  )
}
// Action button component
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-orange-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
// Add missing imports
function Info(props: any) {
  return <AlertCircle {...props} />
}
function Check(props: any) {
  return <Shield {...props} />
}
