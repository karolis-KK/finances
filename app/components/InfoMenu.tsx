'use client'

import type { Category, Transaction } from "@/types/finance"
import { X, Euro } from "lucide-react"
import { useState } from "react"

type InfoMenuProps = {
  category: Category
  isOpenInfoMenu: string | null
  handleOpenInfoMenu: (categoryId: string) => void
  transactions: Transaction[]
}

export default function InfoMenu({
  category,
  isOpenInfoMenu,
  handleOpenInfoMenu,
  transactions,
}: InfoMenuProps) {
  const [isOpenTransactionsMenu, setIsOpenTransactionsMenu] = useState<string | null>(null)

  const openTransactionsMenu = (categoryId: string) => {
    setIsOpenTransactionsMenu((isOpenTransactionsMenu) => (isOpenTransactionsMenu === categoryId ? null : categoryId))
  }
  const usagePercentage =
    category.amount > 0
      ? Math.min((category.used / category.amount) * 100, 100)
      : 0
  const recentExpenses = transactions
    .filter(
      (transaction) =>
        transaction.categoryId === category.id &&
        transaction.type === "expense",
    )
    .slice(-5)
    .reverse()

  const categoryTransactions = (
    transactions: Transaction[],
    categoryId: string,
  ): Transaction[] => {
    const t = transactions.filter(
      (transaction) => transaction.categoryId === categoryId,
    )
    return t
  }

  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-[#403d39] p-6 text-[#fffcf2] transition-transform duration-300 ${
        isOpenInfoMenu === category.id ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        type="button"
        onClick={() => handleOpenInfoMenu(category.id)}
        className="flex w-full justify-end"
        aria-label={`Close information for ${category.name}`}
      >
        <X size={24} />
      </button>
      <h1 className="text-4xl font-medium">{category.name}</h1>
      <div className="mt-4 flex justify-between">
        <div className="text-[#fffcf2cc] gap-y-2 flex flex-col">
          <div className="flex items-center gap-x-2">
            <div className="size-4 bg-[#403d39] border border-[#fffcf2cc]"></div>
            <h1>Total for the month</h1>
          </div>
          <div className="flex items-center gap-x-2">
            <div
              className="size-4 border border-[#fffcf2cc]"
              style={{
                backgroundColor: category.color ?? "#eb5e28",
              }}
            ></div>
            <h1>
              Total <span className="underline">used</span> for the month
            </h1>
          </div>
        </div>
        <div className="gap-y-2 flex flex-col">
          <div className="flex items-center">
            [{category.amount}
            <Euro size={16} />]
          </div>
          <div className="flex items-center">
            [{category.used}
            <Euro size={16} />]
          </div>
        </div>
      </div>
      <div className="relative flex mt-4 h-12 w-full items-center justify-center overflow-hidden rounded-sm border border-[#fffcf2cc]">
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${usagePercentage}%`,
            backgroundColor: category.color ?? "#eb5e28",
          }}
        ></div>
        <h1 className="relative z-10">[{usagePercentage.toFixed(0)}%] used</h1>
      </div>
      <div className="flex mt-4 justify-between">
        <h1 className="text-[#fffcf2cc]">Total left for the month</h1>
        <div className="flex items-center justify-center">
          [{category.amount - category.used}
          <Euro size={16} />]
        </div>
      </div>
      <div className="w-full h-[0.5px] mt-4 mb-4 bg-white"></div>
      <div>
        <h1 className="text-4xl font-medium">Recent expenses</h1>
        <ul className="mt-2 flex-col flex gap-y-2">
          {recentExpenses.map((transaction) => (
            <li
              className="flex items-center justify-between"
              key={transaction.id}
            >
              <span className="flex items-center">
                {transaction.amount}
                <span className="flex ml-2 items-center">
                  [<Euro className="" size={16} />]
                </span>
              </span>
              <span>{transaction.date}</span>
            </li>
          ))}
        </ul>
        <div
          className={`justify-end mt-4 ${categoryTransactions(transactions, category.id).length > 5 ? "flex" : "hidden"}`}
        >
          <button onClick={() => openTransactionsMenu(category.id)} className="bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md pt-2 pb-2 pl-4 pr-4">
            View all
          </button>
          <h1 className={`${category.id === isOpenTransactionsMenu ? 'flex' : 'hidden'}`}>yooo</h1>
        </div>
      </div>
    </aside>
  )
}
