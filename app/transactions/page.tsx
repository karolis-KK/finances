"use client"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { useFinance } from "../context/FinanceContext"
import { Euro, EuroIcon, EllipsisVertical } from "lucide-react"

export default function TransactionsPage() {
  const { categories, transactions } = useFinance()

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 pr-12 pl-12 pt-8 pb-28">
        <ul className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="bg-[#403d39] p-4 rounded-md flex justify-between">
                <div className="flex gap-4 items-center text-4xl bg-[#fffcf2] text-[#252422] w-fit pt-2 pb-2 pr-3 pl-3 rounded-md">
                <div className="flex items-center gap-4">
                    <div className="">
                        {categories.find((category) => category.id === transaction.categoryId)?.emoji ?? "📁"}
                    </div>
                    <h1>
                        {categories.find((category) => category.id === transaction.categoryId)?.name ?? "Uncategorized"}
                    </h1>
                </div>
                {/*<div
                  className="size-8 border"
                  style={{
                    backgroundColor:
                      categories.find((category) => category.id === transaction.categoryId)?.color ?? "#eb5e28",
                  }}
                ></div>*/}
                </div>
                <div className="flex text-3xl items-center gap-2">
                    Expense amount [{transaction.amount.toFixed(2)}
                    <EuroIcon size={35} />]
                </div>
                <div className="flex text-3xl items-center gap-2">
                    Entry date [{transaction.date}]
                </div>
                <div className="flex items-center justify-center">
                    <button className="hover:cursor-pointer p-2 hover:bg-[#fffcf2]/80 flex items-center justify-center bg-[#fffcf2] text-[#252422] rounded-md">
                        <EllipsisVertical size={30} />
                    </button>
                </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer categories={categories} page={"transactions"} />
    </section>
  )
}
