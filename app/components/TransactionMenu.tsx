"use client"

import { useState } from "react"
import { Category, Transaction } from "@/types/finance"
import { X, EuroIcon } from "lucide-react"

type TransactionMenuProps = {
  category: Category | null
  transaction: Transaction
  id: string | null
  handleOpen: (transactionId: string) => void
  handleDeleteTransaction: (transactionId: string) => void
  handleEditTransaction: (
    transactionId: string,
    newAmount: number,
    newDate: string,
  ) => void
}

export default function TransactionMenu({
  category,
  transaction,
  id,
  handleOpen,
  handleDeleteTransaction,
  handleEditTransaction,
}: TransactionMenuProps) {
  const [newAmount, setNewAmount] = useState<number>(transaction.amount)
  const [newDate, setNewDate] = useState<string>(
    transaction.date
  )
  const [openTransactionEditMenu, setOpenTransactionEditMenu] = useState<string | null>(null)

  const handleOpenEditTransactionMenu = (transactionId: string): void => {
    if (transactionId === transaction.id) {
      setNewAmount(transaction.amount)
    }

    setOpenTransactionEditMenu((id) => transactionId === id ? null : transactionId)
  }

  const handleEditTransactionSave = (transactionId: string): void => {
    handleEditTransaction(transactionId, newAmount, newDate)
    setOpenTransactionEditMenu((id) => transactionId === id ? null : transactionId)
  }

  return (
    <>
        <div className={`fixed flex items-center justify-center text-white inset-0 z-50 h-screen w-screen bg-[#252422]/40 ${transaction.id === openTransactionEditMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="bg-[#252422] p-6 rounded-md">
                <button className="hover:cursor-pointer" onClick={() => setOpenTransactionEditMenu((id) => transaction.id === id ? null : transaction.id)}><X size={20} /></button>
                <div className="flex flex-col gap-1 mt-2">
                    <label htmlFor="edit-transaction-amount">Edit transaction amount</label>
                    <div className="relative">
                        <EuroIcon
                          size={18}
                          aria-hidden="true"
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 mt-0.5"
                        />
                        <input
                          id="edit-transaction-amount"
                          type="number"
                          placeholder="Edit expense amount"
                          value={newAmount}
                          onChange={(event) => setNewAmount(Number(event.target.value))}
                          className="border border-[#fffcf2]/20 mt-1 pl-10 w-full pr-2 pt-2 pb-2 rounded-md focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                    <label htmlFor="edit-transaction-date">Edit transaction date</label>
                    <div className="relative">
                        <input
                          id="edit-transaction-date"
                          type="date"
                          placeholder="Edit transaction date"
                          value={newDate}
                          onChange={(event) => setNewDate(event.target.value)}
                          className="border border-[#fffcf2]/20 mt-1 pl-2 w-full pr-2 pt-2 pb-2 rounded-md focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>
                <button onClick={() => handleEditTransactionSave(transaction.id)} className="hover:cursor-pointer bg-[#fffcf2] pt-1.5 pb-1.5 pl-4 pr-4 rounded-md hover:bg-[#fffcf2]/70 text-[#252422] mt-4 w-full">Save</button>
            </div>
        </div>
        <aside
        className={`${id === transaction.id ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-40 h-screen w-full max-w-md bg-[#403d39] p-6 text-[#fffcf2] transition-transform duration-300`}
        >
            <div className="pt-4">
                <button className="hover:cursor-pointer">
                <X onClick={() => handleOpen(transaction.id)} size={28} />
                </button>
                <div className="flex gap-2 text-4xl font-medium mt-6">
                <h1>{category?.emoji}</h1>
                <h1>{category?.name}</h1>
                </div>
                <div className="flex text-lg mt-4 items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1>Expense amount</h1>
                    <h1>Entry date</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="flex items-center">
                    [{transaction.amount} <EuroIcon className="ml-2" size={18} />]
                    </h1>
                    <h1>[{transaction.date}]</h1>
                </div>
                </div>
                <div
                className="w-full h-8 border-[#fffcf2cc] border mt-4"
                style={{
                    backgroundColor: category?.color ?? "#eb5e28",
                }}
                ></div>
                <div className="flex items-center justify-between mt-4 text-[#252422]">
                <button
                    onClick={() => handleOpenEditTransactionMenu(transaction.id)}
                    className="hover:cursor-pointer bg-[#fffcf2] pt-1.5 pb-1.5 pl-4 pr-4 rounded-md hover:bg-[#fffcf2]/70"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="hover:cursor-pointer bg-[#fffcf2] pt-1.5 pb-1.5 pl-4 pr-4 rounded-md hover:bg-[#fffcf2]/70"
                >
                    Delete
                </button>
                </div>
            </div>
        </aside>
    </>
  )
}
