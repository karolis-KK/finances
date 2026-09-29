"use client"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import TransactionMenu from "../components/TransactionMenu"
import { useFinance } from "../context/FinanceContext"
import { Euro, EuroIcon, EllipsisVertical } from "lucide-react"
import { useState } from "react"

export default function TransactionsPage() {
  const { categories, transactions, setCategories, setTransactions } =
    useFinance()
  const [isOpenTransactionMenu, setIsOpenTransactionMenu] = useState<
    string | null
  >(null)

  const handleOpenTransactionMenu = (transactionId: string): void => {
    setIsOpenTransactionMenu((id) =>
      transactionId === id ? null : transactionId,
    )
  }

  const handleDeleteTransaction = (transactionId: string): void => {
    const transactionToDelete = transactions.find(
      (transaction) => transaction.id === transactionId,
    )

    if (!transactionToDelete) {
      return
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      ),
    )

    if (transactionToDelete.type === "expense") {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === transactionToDelete.categoryId
            ? {
                ...category,
                used: Math.max(category.used - transactionToDelete.amount, 0),
              }
            : category,
        ),
      )
    }

    setIsOpenTransactionMenu(null)
  }

  const handleEditTransaction = (
    transactionId: string,
    newAmount: number,
    newDate: string,
  ): void => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === transactionId,
    )

    if (!transactionToEdit) {
      return
    }

    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, amount: newAmount, date: newDate }
          : transaction,
      ),
    )

    if (transactionToEdit.type === "expense") {
      const amountDifference = newAmount - transactionToEdit.amount

      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === transactionToEdit.categoryId
            ? {
                ...category,
                used: Math.max(category.used + amountDifference, 0),
              }
            : category,
        ),
      )
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      {transactions.length !== 0 ? <div className="flex-1 pr-12 pl-12 pt-8 pb-28">
        <ul className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="bg-[#ccc5b9] text-[#252422] p-4 rounded-md flex justify-between"
            >
              <TransactionMenu
                transaction={transaction}
                category={
                  categories.find(
                    (category) => category.id === transaction.categoryId,
                  ) ?? null
                }
                id={isOpenTransactionMenu}
                handleOpen={handleOpenTransactionMenu}
                handleDeleteTransaction={handleDeleteTransaction}
                handleEditTransaction={handleEditTransaction}
              />
              <div className="flex gap-4 items-center text-4xl bg-[#fffcf2] text-[#252422] w-fit pt-2 pb-2 pr-3 pl-3 rounded-md">
                <div className="flex items-center gap-4">
                  <div className="">
                    {categories.find(
                      (category) => category.id === transaction.categoryId,
                    )?.emoji ?? "📁"}
                  </div>
                  <h1>
                    {categories.find(
                      (category) => category.id === transaction.categoryId,
                    )?.name ?? "Uncategorized"}
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
              <div className="flex text-3xl items-center gap-2 bg-[#fffcf2] pt-2 pb-2 pr-3 pl-3 rounded-md">
                Expense amount [{transaction.amount.toFixed(2)}
                <EuroIcon size={35} />]
              </div>
              <div className="flex text-3xl items-center gap-2 bg-[#fffcf2] pt-2 pb-2 pr-3 pl-3 rounded-md">
                Entry date [{transaction.date}]
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="size-10 border-[#fffcf2cc] border" style={{
                  backgroundColor: categories.find(
                    (category) => category.id == transaction.categoryId
                  )?.color ?? "#eb5e28"
                }}>                 
                </div>
                <button
                  onClick={() => handleOpenTransactionMenu(transaction.id)}
                  className="hover:cursor-pointer p-2 hover:bg-[#fffcf2]/80 flex items-center justify-center bg-[#fffcf2] text-[#252422] rounded-md"
                >
                  <EllipsisVertical size={30} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>: <h1 className="text-[#eb5e28] text-4xl">You haven't added any transactions</h1>}
      
      <Footer categories={categories} page={"transactions"} />
    </section>
  )
}
