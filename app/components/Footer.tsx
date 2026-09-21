import type { Category } from "@/types/finance"
import { Euro } from "lucide-react";

type CategoryFooterProps = {
    categories: Category[];
    onToggle: () => void,
    onAddCategory: (category: Category) => void
}

export default function Footer({categories, onToggle, onAddCategory}: CategoryFooterProps) {
    let totalSpent: number = 0;
    let totalBudget: number = 0;

    categories.forEach((c) => {
        totalSpent += c.used;
        totalBudget += c.amount;
    })

    return (
        <footer className="bg-[#ccc5b9] h-20 flex items-center justify-center p-2">
            <div className="bg-[#eb5e28] flex items-center w-full h-full rounded-md justify-between p-2 pl-4 pr-4">
                <div className="flex justify-between items-center text-3xl gap-x-12">
                    <h1>Total categories [{categories.length}]</h1>
                    <h1 className="flex items-center">Total spent [{totalSpent}<Euro size='30' />]</h1>
                    <h1 className="flex items-center">Total budget [{totalBudget}<Euro size='30' />]</h1>
                </div>
                <button onClick={onToggle} className="bg-[#fffcf2] hover:bg-[#fffcf2]/80 hover:cursor-pointer text-[#403d39] text-2xl font-medium p-1.5 rounded-md pl-3 pr-3">Add category</button>
            </div>
        </footer>
    )
}