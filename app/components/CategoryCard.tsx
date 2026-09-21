import type { Category } from "@/types/finance"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"

type CategoryCardProps = {
  categories: Category[]
}

export default function CategoryCard({ categories }: CategoryCardProps) {
  return (
    <ul className="flex flex-wrap gap-6">
      {categories.map((category) => {
        const remaining = Math.max(category.amount - category.used, 0)

        const data = [
          { name: "Used", value: category.used },
          { name: "Remaining", value: remaining },
        ]
        return (
          <li key={category.id}>
            <div className="bg-[#ccc5b9] pt-2 pb-4 pr-3 pl-3 rounded-md">
              <div className="flex items-center justify-center">
                <h1 className="text-[#403d39] text-3xl">{category.name}</h1>
              </div>
              <div className="relative h-48 w-48">
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

                  <Tooltip formatter={(value, name) => [`${value} €`, name]} />
                </PieChart>
              </ResponsiveContainer>

              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-3xl">
                {category.emoji}
              </span>
            </div>
            <button className="flex w-full justify-center bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2">Add expense</button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
