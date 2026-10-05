"use client";

import { useState } from "react";
import type { Category, Transaction } from "@/types/finance";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import CategoryMenu from "../components/CategoryMenu";
import CategoryCard from "../components/CategoryCard";

type CategoryClientProps = {
  categories: Category[];
  transactions: Transaction[];
};

export default function CategoriesClient({
  categories,
  transactions,
}: CategoryClientProps) {
  const [categoryMenu, setCategoryMenu] = useState(false);

  const handleCategoryMenu = () => {
    setCategoryMenu((isOpen) => !isOpen);
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
  };

  /*
  const handleClearMontlyAmount = (currentMonth: string): void => {
    setTransactions(currentTransactions => currentTransactions.filter((transaction) => (currentMonth !== months[Number(transaction.date.slice(5, 7)) - 1])))
  }
  */

  return (
    <section className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0  flex-1 flex-col">
        <CategoryMenu
          categoryMenu={categoryMenu}
          onToggle={handleCategoryMenu}
        />
        {categories.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="text-[#eb5e28] text-center lg:text-5xl text-3xl font-medium">
              You haven&apos;t added any categories
            </h1>
            <button
              onClick={handleCategoryMenu}
              className="text-[#fffcf2] bg-[#eb5e28] hover:bg-[#eb5f28be] p-2 text-xl rounded-md mt-6 hover:cursor-pointer"
            >
              Add category
            </button>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <CategoryCard
              categories={categories}
              /*onAddTransaction={(transaction) =>
                setTransactions((transactions) => [...transactions, transaction])
              }*/
              transactions={transactions}
              currentMonth={currentMonth}
              months={months}
            />
          </div>
        )}
      </div>
      <Footer
        categories={categories}
        transactions={transactions}
        onToggle={handleCategoryMenu}
        //onAddCategory={(category) => setCategories((currentCategories) => [...currentCategories, category])}
        page={"categories"}
        months={months}
        currentMonth={currentMonth}
        //handleMonth={handleMonth}
        //handleClearMontlyAmount={handleClearMontlyAmount}
      />
    </section>
  );
}
