"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenu = () => {
    setIsSidebarOpen((open) => !open)
  }

  const pathname = usePathname()

  return (
    <>
      <nav className="flex shadow-xs bg-[#ccc5b9] justify-between pl-4 pr-4 pt-2 pb-2">
        <div className="size-12 bg-[#eb5e28] flex items-center justify-center text-4xl gap-x-3">
          <div>
          [
          </div>
          <div>
          ]
          </div>
        </div>
        <button
          onClick={handleMenu}
          className="hover:cursor-pointer text-[#252422]"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          {isSidebarOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      <section
        className={`fixed inset-0 z-20 transition-colors ${
          isSidebarOpen ? "bg-black/40" : "pointer-events-none opacity-0"
        }`}
        onClick={handleMenu}
      />

      <aside
        className={`fixed flex right-0 top-0 z-30 h-full border-t-0 bg-[#403d39] text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start text-3xl pl-6 pt-6 gap-4 pr-24">
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleMenu}
              aria-label="Close menu"
              className="hover:cursor-pointer"
            >
              <X size={28} />
            </button>
          </div>
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`relative inline-block after:absolute after:bottom-0 after:left-0
                after:h-[0.5px] after:w-full after:origin-left
                after:bg-current after:transition-transform after:duration-300
                ${
                  pathname === "/"
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            aria-current={pathname === "/transactions" ? "page" : undefined}
            className={`relative inline-block after:absolute after:bottom-0 after:left-0
                after:h-[0.5px] after:w-full after:origin-left
                after:bg-current after:transition-transform after:duration-300
                ${
                  pathname === "/transactions"
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
          >
            Transactions
          </Link>
          <Link
            href="/categories"
            aria-current={pathname === "/categories" ? "page" : undefined}
            className={`relative inline-block after:absolute after:bottom-0 after:left-0
                after:h-[0.5px] after:w-full after:origin-left
                after:bg-current after:transition-transform after:duration-300
                ${
                  pathname === "/categories"
                    ? "after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100"
                }`}
          >
            Categories
          </Link>
        </nav>
        <div className="h-screen w-12 bg-[#eb5e28]"></div>
      </aside>
    </>
  )
}
