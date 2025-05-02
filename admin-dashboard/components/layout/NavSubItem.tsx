"use client"

interface NavSubItemProps {
  label: string
  href: string
}

export function NavSubItem({ label, href }: NavSubItemProps) {
  return (
    <a
      href={href}
      className="block text-sm text-slate-300 hover:text-orange-400 transition-colors"
    >
      {label}
    </a>
  )
}
