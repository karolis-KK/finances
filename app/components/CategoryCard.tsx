"use client"

import { useState } from "react"
import type { Category } from "@/types/finance"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { X, EuroIcon, Calendar } from 'lucide-react'

type CategoryCardProps = {
  categories: Category[]
  onUpdateCategories: (categories: Category[]) => void
}

export default function CategoryCard({ categories, onUpdateCategories }: CategoryCardProps) {
  const [amount, setAmount]: number = useState(0);
  const [date, setDate] = useState('');
  const [isOpenExpenseMenu, setIsOpenExpenseMenu]: boolean = useState(false);

  const handleChangeAmount = (e): void => {
    setAmount(Number(e.target.value));
  }

  const handleChangeDate = (e): void => {
    setDate(e.target.value)
  }

  const handleOpenExpenseMenu = (): void => {
    setIsOpenExpenseMenu((o: boolean) => !o)
  }

  const handleAddExpense = (id: string) => {
    onUpdateCategories(categories.map((category) => category.id === id ? { ...category, used: category.used + amount } : category))
    setIsOpenExpenseMenu((o: boolean) => !o)
  }

  return (
    <ul className="flex flex-wrap gap-6">
      {categories.map((category) => {
        const remaining = Math.max(category.amount - category.used, 0)

        const data = [
          { name: "Used", value: category.used },
          { name: "Remaining", value: remaining },
        ]
        return (
          <li key={category.id} className="relative overflow-hidden">
            <div className="bg-[#ccc5b9] pt-2 pb-4 pr-3 pl-3 rounded-md">
              <div className="flex items-center justify-center">
                <h1 className="text-[#403d39] text-3xl">{category.name}</h1>
              </div>
              <div className="relative h-48 w-48">
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
              <button
                onClick={handleOpenExpenseMenu}
                className="flex w-full justify-center bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2"
              >
                Add expense
              </button>
            </div>
            <div
              className={`absolute inset-0 flex flex-col bg-[#403d39] p-4 rounded-md transition-transform duration-300 ${
                isOpenExpenseMenu ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button className="hover:cursor-pointer flex justify-end text-right" onClick={handleOpenExpenseMenu}><X size={24} /></button>
              <div className="relative -mt-1">
                <label htmlFor="amount">Amount</label>
                  <EuroIcon
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 mt-3.5"
                  />
                <input onChange={handleChangeAmount} type="number" id="amount" className="border border-[#fffcf2]/20 mt-1 w-full pl-10 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0" />
              </div>
              <div className="relative mt-2">
                <label htmlFor="date">Date</label>
                <Calendar
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 mt-3.5"
                  />
                <input onChange={handleChangeDate} type="date" id="date" className="border border-[#fffcf2]/20 mt-1 w-full pl-10 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0" />
              </div>
              <button onClick={() => handleAddExpense(category.id)} className="bg-[#fffcf2] text-[#403d39] p-2 mt-4 rounded-md hover:cursor-pointer hover:bg-[#fffcf2]/70">Add expense</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
