"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import type { Category, Transaction } from "@/types/finance";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import InfoMenu from "./InfoMenu";
import {
  X,
  EuroIcon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { addTransaction } from "../categories/actions";
import { useFinance } from "../context/FinanceContext";
import CategoryErrorCard from "./CategoryErrorCard";

const CATEGORIES_PER_PAGE = 12;

type CategoryCardProps = {
  categories: Category[];
  currentMonth: string;
  months: string[];
};

export default function CategoryCard({
  categories,
  currentMonth,
  months,
}: CategoryCardProps) {
  const { transactions, setTransactions } = useFinance();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openExpenseCategoryId, setOpenExpenseCategoryId] = useState<
    string | null
  >(null); // arba string (category.id) arba null (nei vienas), pradinis value - null
  const [isOpenInfoMenu, setIsOpenInfoMenu] = useState<string | null>(null);
  const [isOpenErrorCard, setIsOpenErrorCard] = useState<string | null>(null);

  const handleIsOpenErrorCardChange = (categoryId: string) => {
    setIsOpenErrorCard(isOpenErrorCard === null ? categoryId : null);
  };

  const totalPages = Math.max(
    Math.ceil(categories.length / CATEGORIES_PER_PAGE),
    1,
  );

  const visibleCategories = categories.slice(
    (currentPage - 1) * CATEGORIES_PER_PAGE,
    currentPage * CATEGORIES_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  // laukia kol pasikeis currentMonth ir tada pakeicia puslapio wide data, kuria naudojame prideti nauja transaction
  useEffect(() => {
    const selectedMonthIndex = months.indexOf(currentMonth);
    if (selectedMonthIndex < 0) {
      return;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(selectedMonthIndex + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setDate(`${year}-${month}-${day}`);
  }, [currentMonth]);

  const handleOpenInfoMenu = (categoryId: string): void => {
    setIsOpenInfoMenu((openInfoMenuId) =>
      openInfoMenuId === categoryId ? null : categoryId,
    );
  };

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  };

  const getUsedAmount = (
    categoryId: string,
    totalAmount: number,
    currentMonth: string,
  ): number => {
    const selectedMonthIndex = months.indexOf(currentMonth);
    if (selectedMonthIndex < 0) {
      return 0;
    }

    const selectedYear = new Date().getFullYear();
    const usedAmount = transactions
      .filter((transaction) => {
        const transactionDate = new Date(`${transaction.date}T00:00:00`);

        return (
          transaction.categoryId === categoryId &&
          transaction.type === "expense" &&
          transactionDate.getFullYear() === selectedYear &&
          transactionDate.getMonth() === selectedMonthIndex
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);

    return Math.min(usedAmount, totalAmount);
  };

  const handleAddTransaction = async (
    categoryId: string,
    amount: number,
    date: string,
    totalRemaining: number,
  ): Promise<void> => {
    const transaction = await addTransaction(
      {
        amount: amount > totalRemaining ? totalRemaining : amount,
        type: "expense",
        date,
        categoryId,
      },
      categoryId,
    );

    console.log("created", transaction);

    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions,
    ]);
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleOpenExpenseMenu = (categoryId: string): void => {
    setOpenExpenseCategoryId((openCategoryId) =>
      openCategoryId === categoryId ? null : categoryId,
    );
  };

  const handleAddExpenseMenu = (category: Category): void => {
    if (
      getUsedAmount(category.id, category.amount, currentMonth) >=
      category.amount
    ) {
      return;
    }

    handleOpenExpenseMenu(category.id);
  };

  const handleAddExpense = async (
    id: string,
    totalRemaining: number,
    transactionAmount: number,
  ) => {
    if (transactionAmount > totalRemaining) {
      handleIsOpenErrorCardChange(id);
    } else {
      await handleAddTransaction(id, Number(amount), date, totalRemaining);
      setOpenExpenseCategoryId(null);
      setAmount("");
    }
  };
  return (
    <div className="flex flex-col items-center lg:gap-6 pt-4 pb-8">
      <ul className="grid lg:grid-cols-6 gap-6 lg:grid-rows-2 lg:gap-6 lg:w-auto w-screen lg:p-4 pr-12 pl-12">
        {visibleCategories.map((category) => {
          const used = getUsedAmount(
            category.id,
            category.amount,
            currentMonth,
          );
          const remaining = Math.max(category.amount - used, 0);

          const data = [
            { name: "Used", value: used },
            { name: "Remaining", value: remaining },
          ];
          return (
            <li
              key={category.id}
              id={category.id}
              className="relative col-span-1 row-span-1 w-full overflow-hidden"
            >
              <InfoMenu
                transactions={transactions}
                handleOpenInfoMenu={handleOpenInfoMenu}
                isOpenInfoMenu={isOpenInfoMenu}
                category={category}
                used={getUsedAmount(category.id, category.amount, currentMonth)}
                currentMonth={currentMonth}
                months={months}
              />
              {isOpenErrorCard === category.id && (
                <CategoryErrorCard
                  category={category}
                  transactionAmount={Number(amount)}
                  totalRemaining={remaining}
                  handleIsOpenErrorCardChange={handleIsOpenErrorCardChange}
                />
              )}
              <div className="bg-[#ccc5b9] pt-2 pb-4 pr-3 pl-3 rounded-md">
                <div className="flex items-center justify-center">
                  <h1 className="text-[#403d39] text-3xl">{category.name}</h1>
                </div>
                <div className="mt-2 scale-80 flex justify-center items-center">
                  <h1 className="bg-[#fffcf2] text-[#403d39] flex justify-center items-center rounded-md p-1">
                    {used} / {category.amount}{" "}
                    <EuroIcon className="ml-1" size={16} />
                  </h1>
                </div>
                <div className="relative h-48 -mt-1 lg:w-48">
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
                  <button
                    onClick={() => handleOpenInfoMenu(category.id)}
                    className="bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2"
                  >
                    <Info size={24} />
                  </button>
                  <button
                    onClick={() => handleAddExpenseMenu(category)}
                    className="flex w-full justify-center bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2"
                  >
                    {used >= category.amount ? "Limit full" : "Add expense"}
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
                    value={amount}
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
                  onClick={() =>
                    handleAddExpense(category.id, remaining, Number(amount))
                  }
                  className="bg-[#fffcf2] text-[#403d39] p-2 mt-8 rounded-md hover:cursor-pointer hover:bg-[#fffcf2]/70"
                >
                  Add expense
                </button>
              </div>
            </li>
          );
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
  );
}
