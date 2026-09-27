"use client"

import Navbar from "../components/NavBar"
import CategoryCard from "../components/CategoryCard"
import { useState } from "react"
import CategoryMenu from "../components/CategoryMenu"
import Footer from "../components/Footer"
import { useFinance } from "../context/FinanceContext"

export default function CategoriesPage() {
  const {
    categories,
    transactions,
    setCategories,
    setTransactions,
  } = useFinance()
  const [categoryMenu, setCategoryMenu] = useState(false)

  const handleCategoryMenu = () => {
    setCategoryMenu((isOpen) => !isOpen)
  }

  return (
    <section className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col">
        <CategoryMenu
          categoryMenu={categoryMenu}
          onToggle={handleCategoryMenu}
          onAddCategory={(category) =>
            setCategories((currentCategories) => [...currentCategories, category])
          }
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
              onUpdateCategories={setCategories}
              onAddTransaction={(transaction) =>
                setTransactions((transactions) => [...transactions, transaction])
              }
              transactions={transactions}
            />
          </div>
        )}
      </div>
    <Footer
      categories={categories}
      onToggle={handleCategoryMenu}
      onAddCategory={(category) => setCategories((currentCategories) => [...currentCategories, category])}
    />
    </section>
  )
}
