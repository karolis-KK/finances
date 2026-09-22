import type { Category } from "@/types/finance"
import { X } from "lucide-react"

type InfoMenuProps = {
  category: Category
  isOpenInfoMenu: string | null
  handleOpenInfoMenu: (categoryId: string) => void
}

export default function InfoMenu({
  category,
  isOpenInfoMenu,
  handleOpenInfoMenu,
}: InfoMenuProps) {
  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-[#403d39] p-6 text-[#fffcf2] transition-transform duration-300 ${
        isOpenInfoMenu === category.id ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        type="button"
        onClick={() => handleOpenInfoMenu(category.id)}
        className="flex w-full justify-end"
        aria-label={`Close information for ${category.name}`}
      >
        <X size={24} />
      </button>
      <h1 className="text-3xl font-medium">{category.name}</h1>
    </aside>
  )
}
