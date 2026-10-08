"use client"
import { Category } from "@/types/finance"
import { EuroIcon } from "lucide-react"

type CategoryErrorCardProps = {
  category: Category
  transactionAmount: number,
  totalRemaining: number,
  handleIsOpenErrorCardChange: (id: string) => void
}


export default function CategoryErrorCard({category, transactionAmount, totalRemaining, handleIsOpenErrorCardChange}: CategoryErrorCardProps) {

  return (
    <div className="h-screen fixed flex justify-center items-center inset-0 bg-black/40 z-100">
      <div className="bg-[#403d39] rounded-md flex flex-col gap-2 p-4">
        <h1 className="text-lg font-medium text-[#fffcf2]">Error!</h1>
        <h1 className="text-[#fffcf2] pb-2 flex items-center justify-center">You only have {totalRemaining} <EuroIcon className="ml-1" size={17} /> remaining for {category.name} for the current month</h1>
        <button onClick={() => handleIsOpenErrorCardChange(category.id)} className="bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2">Close</button>
      </div>
    </div>
  )
}