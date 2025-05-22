"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Book } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    path: "",
    payment: "Free",
  })

  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const tabs = [
    { label: "Create Course", path: "/dashboard/courses/createCourse" },
    { label: "Create Phase", path: "/dashboard/courses/createPhase" },
    { label: "Create Week", path: "/dashboard/courses/createWeek" },
    { label: "Week Component", path: "/dashboard/courses/createWeekComponent" },
  ]

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
        <Book className="text-green-500" />
        Create Course
      </h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-600">
        {tabs.map(tab => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`pb-2 ${
              pathname === tab.path
                ? "border-b-2 border-green-500 text-green-600"
                : "hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <Card className="p-6 border border-gray-200 space-y-5">
        <div className="space-y-4 text-sm">
          <div>
            <Label className="mb-1 text-gray-800">Course Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Full Stack Development"
            />
          </div>

          <div>
            <Label className="mb-1 text-gray-800">Course Duration</Label>
            <Input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 3 months"
            />
          </div>

          <div>
            <Label className="mb-1 text-gray-800">Description</Label>
            <Textarea
              rows={4}
              placeholder="Describe the course..."
            />
          </div>

          <div>
            <Label className="mb-1 text-gray-800">Course Icon</Label>
            <Input
              type="file"
              accept=".jpg,.jpeg,.png,.gif"
            />
            <p className="text-xs text-gray-500 mt-1">60×60 | jpg, jpeg, gif, png</p>
          </div>

          <div>
            <Label className="mb-1 text-gray-800">Course Path</Label>
            <Input
              name="path"
              value={formData.path}
              onChange={handleChange}
              placeholder="/full-stack"
            />
          </div>

          <div>
            <Label className="mb-1 text-gray-800">Payment Status</Label>
            <div className="flex gap-6 mt-2 text-gray-700">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="payment"
                  value="Free"
                  checked={formData.payment === "Free"}
                  onChange={handleChange}
                />
                <span>Free</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="payment"
                  value="Paid"
                  checked={formData.payment === "Paid"}
                  onChange={handleChange}
                />
                <span>Paid</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
              Save & Create New
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-orange-600 text-white">
              Save & Next →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
