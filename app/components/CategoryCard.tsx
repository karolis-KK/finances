"use client"

import { useEffect, useState, type ChangeEvent } from "react"
import type { Category } from "@/types/finance"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"
import InfoMenu from "./InfoMenu"
import {
  X,
  EuroIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react"

const CATEGORIES_PER_PAGE = 12

type CategoryCardProps = {
  categories: Category[]
  onUpdateCategories: (categories: Category[]) => void
}

export default function CategoryCard({
  categories,
  onUpdateCategories,
}: CategoryCardProps) {
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [openExpenseCategoryId, setOpenExpenseCategoryId] = useState<string | null>(null) // arba string (category.id) arba null (nei vienas), pradinis value - null
  const [categoryAlertId, setCategoryAlertId] = useState<string | null>(null)
  const [isOpenInfoMenu, setIsOpenInfoMenu] = useState<string | null>(null);

  const totalPages = Math.max(
    Math.ceil(categories.length / CATEGORIES_PER_PAGE),
    1,
  )

  const visibleCategories = categories.slice(
    (currentPage - 1) * CATEGORIES_PER_PAGE,
    currentPage * CATEGORIES_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages))
  }, [totalPages])

  const handleCategoryAlert = (categoryId: string): void => {
    setCategoryAlertId(categoryId)
  }

  const handleOpenInfoMenu = (categoryId: string): void => {
    setIsOpenInfoMenu((openInfoMenuId) => 
      openInfoMenuId === categoryId ? null : categoryId
    )
  }

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(Number(e.target.value))
  }

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value)
  }

  const handleOpenExpenseMenu = (categoryId: string): void => {
    setOpenExpenseCategoryId((openCategoryId) =>
      openCategoryId === categoryId ? null : categoryId,
    )
  }

  const handleAddExpenseMenu = (category: Category): void => {
    if (category.used >= category.amount) {
      handleCategoryAlert(category.id)
      return
    }

    handleOpenExpenseMenu(category.id)
  }

  const handleAddExpense = (id: string) => {
    onUpdateCategories(
      categories.map((category) =>
        category.id === id
          ? {
              ...category,
              used:
                category.used + amount > category.amount
                  ? category.amount
                  : category.used + amount,
            }
          : category,
      ),
    )
    setOpenExpenseCategoryId(null)
  }
  return (
    <div className="flex flex-col items-center lg:gap-6 pt-8 pb-8">
      <ul className="grid lg:grid-cols-6 gap-6 lg:grid-rows-2 lg:gap-6 lg:w-auto w-screen lg:p-4 pr-12 pl-12">
        {visibleCategories.map((category) => {
          const remaining = Math.max(category.amount - category.used, 0)

          const data = [
            { name: "Used", value: category.used },
            { name: "Remaining", value: remaining },
          ]
          return (
            <li
              key={category.id}
              className="relative col-span-1 row-span-1 w-full overflow-hidden"
            >
              <InfoMenu handleOpenInfoMenu={handleOpenInfoMenu} isOpenInfoMenu={isOpenInfoMenu} category={category} />
              <div className="bg-[#ccc5b9] pt-2 pb-4 pr-3 pl-3 rounded-md">
                <div className="flex items-center justify-center">
                  <h1 className="text-[#403d39] text-3xl">{category.name}</h1>
                </div>
                <div className="relative h-48 lg:w-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={45}
                        outerRadius={70}
                      >
                        <Cell fill={category.color} />
                        <Cell fill="#403d39" />
                      </Pie>

                      <Tooltip
                        formatter={(value, name) => [`${value} €`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl">
                    {category.emoji}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenInfoMenu(category.id)} className="bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2">
                    <Info size={24} />
                  </button>
                  <button
                    onClick={() => handleAddExpenseMenu(category)}
                    className="flex w-full justify-center bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2"
                  >
                    {categoryAlertId === category.id
                      ? "You've used your limit"
                      : "Add expense"}
                  </button>
                </div>
              </div>
              <div
                className={`absolute inset-0 flex flex-col rounded-md bg-[#403d39] p-4 transition-transform duration-300 ${
                  openExpenseCategoryId === category.id
                    ? "translate-x-0"
                    : "translate-x-full"
                }`}
              >
                <button
                  className="hover:cursor-pointer flex justify-end text-right"
                  onClick={() => handleOpenExpenseMenu(category.id)}
                >
                  <X size={24} />
                </button>
                <div className="relative -mt-1">
                  <label htmlFor="amount">Amount</label>
                  <EuroIcon
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 mt-3.5"
                  />
                  <input
                    onChange={handleChangeAmount}
                    type="number"
                    id="amount"
                    className="border border-[#fffcf2]/20 mt-1 w-full pl-10 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="relative mt-4">
                  <label htmlFor="date">Date</label>
                  <Calendar
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 mt-3.5"
                  />
                  <input
                    onChange={handleChangeDate}
                    type="date"
                    id="date"
                    className="border border-[#fffcf2]/20 mt-1 w-full pl-10 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0"
                  />
                </div>
                <button
                  onClick={() => handleAddExpense(category.id)}
                  className="bg-[#fffcf2] text-[#403d39] p-2 mt-8 rounded-md hover:cursor-pointer hover:bg-[#fffcf2]/70"
                >
                  Add expense
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <nav aria-label="Category pages" className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="rounded-md bg-[#eb5e28] p-2 text-[#fffcf2] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={24} />
          </button>
          <span className="text-[#403d39]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="rounded-md bg-[#eb5e28] p-2 text-[#fffcf2] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={24} />
          </button>
        </nav>
      )}
    </div>
  )
}
