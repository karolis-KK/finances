"use client"

import Navbar from "../components/NavBar"
import CategoryCard from "../components/CategoryCard"
import { useState } from "react"
import type { Category } from "@/types/finance"
import CategoryMenu from "../components/CategoryMenu"

export default function CategoriesPage() {
  const emptyCategories: Category[] = []

  const [categories, setCategories] = useState(emptyCategories)
  const [categoryMenu, setCategoryMenu] = useState(false)

  const handleCategoryMenu = () => {
    setCategoryMenu((isOpen) => !isOpen)
  }

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />

      <div
        className={`flex-1 ${
          categories.length === 0 ? "flex items-center justify-center" : ""
        }`}
      >
        <CategoryMenu
          categoryMenu={categoryMenu}
          onToggle={handleCategoryMenu}
        />
        {categories.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[#eb5e28] text-5xl font-medium">
              You haven't added any categories
            </h1>
            <button
              onClick={handleCategoryMenu}
              className="text-[#fffcf2] bg-[#eb5e28] hover:bg-[#eb5f28be] p-2 text-xl rounded-md mt-6 hover:cursor-pointer"
            >
              Add category
            </button>
          </div>
        ) : (
          <div>
            <CategoryCard categories={categories} />
          </div>
        )}
      </div>
    </section>
  )
}
