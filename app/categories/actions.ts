"use server"

import { prisma } from '@/lib/prisma'

type Category = {
    name: string
    amount: number
    color?: string
    emoji?: string
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
        console.warn(`${error}, category with ${categoryId} was not found`)
    }
}