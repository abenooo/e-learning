"use client"

import { useState } from "react"
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavDropdownProps {
  icon: LucideIcon
  label: string
  children: React.ReactNode
}

export function NavDropdown({ icon: Icon, label, children }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-slate-300 hover:text-orange-400"
      >
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-orange-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-400" />
        )}
      </Button>

      {isOpen && <div className="ml-6 mt-1 space-y-2">{children}</div>}
    </div>
  )
}
