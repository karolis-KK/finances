"use server"

import { prisma } from '@/lib/prisma'

type NewCategory = {
    name: string
    amount: number
    color?: string
    emoji?: string
}

export async function createCategory(newCategory: NewCategory) {
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