import { prisma } from '@/lib/prisma'
import CategoriesClient from "./CategoriesClient"
import type { Category, Transaction, TransactionType} from "@/types/finance"

export default async function CategoriesPage() {
  const [dbCategories, dbTransactions] = await Promise.all([
    prisma.category.findMany({
      orderBy: { createdAt : "desc" }
    }),
    prisma.transaction.findMany({
      orderBy: { createdAt : "desc" }
    })
  ]);

  const categories: Category[] = dbCategories.map((category) => ({
    id: category.id,
    name: category.name,
    amount: category.budget,
    used: 0,
    color: category.color,
    emoji: category.emoji,
  }));

  const transactions: Transaction[] = dbTransactions.map((transaction) => ({
    id: transaction.id,
    amount: transaction.amount,
    type: transaction.type as TransactionType,
    categoryId: transaction.categoryId,
    date: transaction.date.toISOString().slice(0, 10),
  }));

  return (
    <CategoriesClient categories={categories}  transactions={transactions} />
  )
}
