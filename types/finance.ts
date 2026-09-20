export type TransactionType = 'income' | 'expense';

export type Category = {
    id: string,
    name: string,
    color?: string; // hex code for charts and etc (e.g., #00008B)
}

export type Transaction = {
    id: string,
    amount: number,
    type: TransactionType,
    categoryId: string;
    description: string;
    date: string;
}

export type CategoryBudget = {
    id: string;
    categoryId: string;
    monthlyLimit: number;
}

export type CategoryGoal = Omit<CategoryBudget, 'monthlyLimit'> & {
    targetAmount: number;
}