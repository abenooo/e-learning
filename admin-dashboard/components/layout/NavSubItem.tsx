"use client"

interface NavSubItemProps {
  label: string
  href: string
}

export function NavSubItem({ label, href }: NavSubItemProps) {
  return (
    <a
      href={href}
      className="block px-3 py-2 rounded-md bg-slate-800/10 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-orange-400 hover:shadow-md transition-all duration-200"
    >
      {label}
    </a>
  )
}
