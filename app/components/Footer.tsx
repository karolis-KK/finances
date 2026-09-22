"use client"

import { useState } from "react"
import type { Category } from "@/types/finance"
import { Euro, ChartNoAxesColumn, X } from "lucide-react"

type CategoryFooterProps = {
  categories: Category[]
  onToggle: () => void
  onAddCategory: (category: Category) => void
}

export default function Footer({
  categories,
  onToggle,
  onAddCategory,
}: CategoryFooterProps) {
  let totalSpent: number = 0
  let totalBudget: number = 0

  categories.forEach((c): void => {
    totalSpent += c.used
    totalBudget += c.amount
  })

  const [isOpenStatsMenu, setIsOpenStatsMenu] = useState(false)

  const handleStatsMenu = (): void => {
    setIsOpenStatsMenu((isOpen) => !isOpen)
  }

  return (
    <footer className="bg-[#ccc5b9] bottom-0 w-full sticky lg:static z-20 h-20 flex items-center justify-center p-2">
      <div className="bg-[#eb5e28] flex items-center w-full h-full rounded-md justify-between p-2 pl-4 pr-4">
        <button onClick={handleStatsMenu} className="lg:hidden">
          <ChartNoAxesColumn
            className="bg-[#fffcf2] text-[#403d39] rounded-md p-2 m-0"
            size={46}
          />
        </button>
        <div className="justify-between lg:flex hidden items-center text-3xl gap-x-12">
          <h1>Total categories [{categories.length}]</h1>
          <h1 className="flex items-center">
            Total spent [{totalSpent}
            <Euro size="30" />]
          </h1>
          <h1 className="flex items-center">
            Total budget [{totalBudget}
            <Euro size="30" />]
          </h1>
        </div>
        <button
          onClick={onToggle}
          className="bg-[#fffcf2] hover:bg-[#fffcf2]/80 hover:cursor-pointer text-[#403d39] text-2xl font-medium p-1.5 rounded-md pl-3 pr-3"
        >
          Add category
        </button>
      </div>
      <div
        className={`fixed top-0 flex w-full items-end justify-between
          bg-[#403d39] pr-4 transition-transform duration-300
          ${isOpenStatsMenu ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex">
          <div className="w-10 self-stretch bg-[#eb5e28]"></div>
          <div className="flex flex-col gap-2 text-2xl pb-4 pt-4 pl-4">
            <h1>Total categories [{categories.length}]</h1>

            <h1 className="flex items-center">
              Total spent [{totalSpent}
              <Euro size="15" />]
            </h1>

            <h1 className="flex items-center">
              Total budget [{totalBudget}
              <Euro size="15" />]
            </h1>
          </div>
        </div>
        <button className="pb-4 pt-4" onClick={handleStatsMenu}>
          <X size="24" />
        </button>
      </div>
    </footer>
  )
}
