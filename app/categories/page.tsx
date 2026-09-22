"use client"

import Navbar from "../components/NavBar"
import CategoryCard from "../components/CategoryCard"
import { useEffect, useState } from "react"
import type { Category } from "@/types/finance"
import CategoryMenu from "../components/CategoryMenu"
import Footer from "../components/Footer"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryMenu, setCategoryMenu] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch("/sample_categories.json")

      if (!response.ok) {
        throw new Error(`Failed to load categories: ${response.status}`)
      }

      const sampleCategories: Category[] = await response.json()
      setCategories(sampleCategories)
    }

    loadCategories().catch((error: unknown) => {
      console.error("Could not load sample categories.", error)
    })
  }, [])

  const handleCategoryMenu = () => {
    setCategoryMenu((isOpen) => !isOpen)
  }

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col">
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
