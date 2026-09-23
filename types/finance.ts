export type TransactionType = 'income' | 'expense';

export const DEFAULT_CATEGORY_COLOR = '#eb5e28';
export const DEFAULT_CATEGORY_EMOJI ='📁'

export type Transaction = {
    id: string,
    amount: number,
    type: TransactionType,
    categoryId: string;
    date: string;
}

export type Category = {
    id: string,
    name: string,
    amount: number,
    used: number,
    color?: string; // hex code for charts and etc (e.g., #00008B)
    emoji?: string;
    transactions?: Transaction[]
}

export type CategoryBudget = {
    id: string;
    categoryId: string;
    monthlyLimit: number;
}

export type CategoryGoal = Omit<CategoryBudget, 'monthlyLimit'> & {
    targetAmount: number;
}