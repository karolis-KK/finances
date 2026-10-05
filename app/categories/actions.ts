"use server"

import { prisma } from '@/lib/prisma'
import type { TransactionType } from '@/types/finance'

type Category = {
    name: string
    amount: number
    color?: string
    emoji?: string
}

type Transaction = {
    amount: number,
    type: TransactionType,
    categoryId: string,
    date: string
}

export async function createCategory(newCategory: Category) {
    const category = await prisma.category.create({
        data: {
            name: newCategory.name,
            budget: newCategory.amount,
            color: newCategory.color ?? "#eb5e28",
            emoji: newCategory.emoji ?? "📁",
        },
    })

    return {
        id: category.id,
        name: category.name,
        amount: category.budget,
        used: 0,
        color: category.color,
        emoji: category.emoji
    }
}

export async function deleteCategory(categoryId: string) {
    try {
        return await prisma.category.delete({
        where: {
            id: categoryId,
        }
    })
    }
    catch (error) {
        console.warn(`${error}, category with the ${categoryId} was not found`)
    }
}

export async function addTransaction(newTransaction: Transaction, categoryId: string) {
    const transaction = await prisma.transaction.create({
        data: {
            amount: newTransaction.amount,
            type: newTransaction.type,
            date: new Date(newTransaction.date),
            categoryId
        }
    })

    return {
        id: transaction.id,
        amount: transaction.amount,
        type: transaction.type as TransactionType,
        categoryId: transaction.categoryId,
        date: transaction.date.toISOString().slice(0, 10),
    }
}

export async function deleteTransaction(transactionId: string) {
    try {
        return await prisma.transaction.delete({
        where: {
            id: transactionId,
        }
    })
    }
    catch (error) {
        console.warn(`${error}, transaction with the ${transactionId} was not found`)
    }
}

export async function editTransaction(oldTransaction: Transaction, transactionId: string, newAmount: number, newDate: string) {
    const editedTransaction = await prisma.transaction.update({
        where: {
            id: transactionId
        },
        data: {
            amount: newAmount,
            date: new Date(newDate)
        }
    })

    return {
        id: transactionId,
        amount: newAmount,
        type: oldTransaction.type,
        categoryId: oldTransaction.categoryId,
        date: newDate
    }
}