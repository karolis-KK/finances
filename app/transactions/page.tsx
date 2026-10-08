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
    console.log(currentMonth);
  };

  const handleClearMontlyAmount = async (
    currentMonth: string,
  ): Promise<void> => {
    const transactions = await clearMonthlyTransactions(currentMonth);
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) =>
          currentMonth !== months[Number(transaction.date.slice(5, 7)) - 1],
      ),
    );
  };

  return (
    <section className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className="flex min-h-0 w-full flex-1 items-start justify-center pb-20">
        {transactions.filter(
          (transaction) =>
            months[Number(transaction.date.slice(5, 7)) - 1] === currentMonth,
        ).length !== 0 ? (
          <div className="w-full px-3 pt-4 pb-28 sm:px-6 sm:pt-6 lg:px-12 lg:pt-8">
            <ul className="flex flex-col gap-3 sm:gap-4">
              {transactions
                .filter(
                  (transaction) =>
                    months[Number(transaction.date.slice(5, 7)) - 1] ===
                    currentMonth,
                )
                .map((transaction) => (
                  <li
                    key={transaction.id}
                    className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-md bg-[#ccc5b9] p-3 text-[#252422] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4 lg:flex lg:justify-between lg:gap-0"
                  >
                    <TransactionMenu
                      transaction={transaction}
                      transactions={transactions}
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
                    <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-md bg-[#fffcf2] px-2 py-2 text-lg text-[#252422] sm:col-span-1 sm:gap-3 sm:px-3 sm:text-2xl lg:w-fit lg:gap-4 lg:px-3 lg:py-2 lg:text-4xl">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                        <div className="">
                          {categories.find(
                            (category) =>
                              category.id === transaction.categoryId,
                          )?.emoji ?? "📁"}
                        </div>
                        <h1 className="truncate">
                          {categories.find(
                            (category) =>
                              category.id === transaction.categoryId,
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
                    <div className="flex min-w-0 items-center gap-1 rounded-md bg-[#fffcf2] px-2 py-2 text-sm sm:gap-2 sm:px-3 sm:text-xl lg:gap-2 lg:px-3 lg:py-2 lg:text-3xl">
                      Expense amount [{transaction.amount.toFixed(2)}
                      <EuroIcon className="size-4 shrink-0 sm:size-6 lg:size-8.75" />
                      ]
                    </div>
                    <div className="flex min-w-0 items-center justify-end gap-1 rounded-md bg-[#fffcf2] px-2 py-2 text-right text-sm sm:justify-start sm:gap-2 sm:px-3 sm:text-xl lg:gap-2 lg:px-3 lg:py-2 lg:text-3xl">
                      Entry date [{transaction.date}]
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-3 sm:col-span-1 sm:gap-4">
                      <div
                        className="size-10 border-[#fffcf2cc] border"
                        style={{
                          backgroundColor:
                            categories.find(
                              (category) =>
                                category.id == transaction.categoryId,
                            )?.color ?? "#eb5e28",
                        }}
                      ></div>
                      <button
                        onClick={() =>
                          handleOpenTransactionMenu(transaction.id)
                        }
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
