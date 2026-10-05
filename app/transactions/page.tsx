"use client";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import TransactionMenu from "../components/TransactionMenu";
import { useFinance } from "../context/FinanceContext";
import { Euro, EuroIcon, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { deleteTransaction, editTransaction } from "../categories/actions";
import { Transaction } from "@/types/finance";
import { clearMonthlyTransactions } from "../categories/actions";

export default function TransactionsPage() {
  const { categories, transactions, setCategories, setTransactions } =
    useFinance();
  const [isOpenTransactionMenu, setIsOpenTransactionMenu] = useState<
    string | null
  >(null);

  const handleOpenTransactionMenu = (transactionId: string): void => {
    setIsOpenTransactionMenu((id) =>
      transactionId === id ? null : transactionId,
    );
  };

  const handleDeleteTransaction = async (
    transactionId: string,
  ): Promise<void> => {
    const transaction = await deleteTransaction(transactionId);

    if (!transaction) {
      return;
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      ),
    );

    setIsOpenTransactionMenu(null);
  };

  const handleEditTransaction = async (
    transaction: Transaction,
    newAmount: number,
    newDate: string,
  ): Promise<void> => {
    const newTransaction = await editTransaction(
      transaction,
      transaction.id,
      newAmount,
      newDate,
    );

    if (!newTransaction) {
      return;
    }

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions.filter(
        (transaction) => transaction.id !== newTransaction.id,
      ),
    ]);
  };

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleDateString("en-US", { month: "long" }),
  );

   const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrentMonth(e.target.value);
    console.log(currentMonth)
  };
  
  const handleClearMontlyAmount = async (currentMonth: string): Promise<void> => {
      const transactions = await clearMonthlyTransactions(currentMonth);
      setTransactions(currentTransactions => currentTransactions.filter((transaction) => (currentMonth !== months[Number(transaction.date.slice(5, 7)) - 1])))
    }

  return (
    <section className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className="flex min-h-0 w-full flex-1 items-center justify-center pb-20">
        {transactions.filter((transaction) => months[Number(transaction.date.slice(5, 7)) - 1] === currentMonth).length !== 0 ? (
          <div className="flex-1 pr-12 pl-12 pt-8 pb-28">
            <ul className="flex flex-col gap-4">
              {transactions.filter((transaction) => months[Number(transaction.date.slice(5, 7)) - 1] === currentMonth).map((transaction) => (
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
                    <div
                      className="size-10 border-[#fffcf2cc] border"
                      style={{
                        backgroundColor:
                          categories.find(
                            (category) => category.id == transaction.categoryId,
                          )?.color ?? "#eb5e28",
                      }}
                    ></div>
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
          </div>
        ) : (
          <h1 className="w-full text-center text-4xl text-[#eb5e28]">
            You haven't added any transactions for {currentMonth}
          </h1>
        )}
      </div>
      <Footer
        categories={categories}
        transactions={transactions}
        page={"transactions"}
        months={months}
        currentMonth={currentMonth}
        handleMonth={handleMonth}
      />
    </section>
  );
}
