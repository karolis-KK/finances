"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"

import type { Category, Transaction } from "@/types/finance"

type FinanceContextValue = {
  categories: Category[]
  transactions: Transaction[]
  // Dispatch<SetStateAction><kazkas>> setCategories: (newCategories: Category[]) => void, it allows both setCategories(newCategories) and setCategories(previous => ...)
  setCategories: Dispatch<SetStateAction<Category[]>>
  setTransactions: Dispatch<SetStateAction<Transaction[]>>
}

type FinanceProviderProps = {
  // everything between <FinanceProvider> and </FinanceProvider>.
  children: ReactNode
}

// shared context. It starts as undefined until a provider supplies a value
const FinanceContext = createContext<FinanceContextValue | undefined>(undefined)

export function FinanceProvider({ children }: FinanceProviderProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // runs after the provider first appears in the browser
  useEffect(() => {
    // load both sample data files and put content into react state
    const loadFinanceData = async () => {
      // fetch both files at the same time instead of waiting for one before starting the other.
      const [categoriesResponse, transactionsResponse] = await Promise.all([
        fetch("/sample_categories.json"),
        fetch("/sample_transactions.json"),
      ])

      // stop loading if the categories request returned an error
      if (!categoriesResponse.ok) {
        throw new Error(
          `Failed to load categories: ${categoriesResponse.status}`,
        )
      }

      // stop loading if the transactions request returned an error
      if (!transactionsResponse.ok) {
        throw new Error(
          `Failed to load transactions: ${transactionsResponse.status}`,
        )
      }

      // convert json responses into the ts data shapes
      const [sampleCategories, sampleTransactions] = await Promise.all([
        categoriesResponse.json() as Promise<Category[]>,
        transactionsResponse.json() as Promise<Transaction[]>,
      ])

      setCategories(sampleCategories)
      setTransactions(sampleTransactions)
    }

    loadFinanceData().catch((error: unknown) => {
      console.error("Could not load finance data.", error)
    })
  }, []) // empty dependecy list - only laod on dom render

  return (
    <FinanceContext.Provider
      value={{ categories, transactions, setCategories, setTransactions }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

// custom hook for reading the shared finance context
export function useFinance() {
  // gets the nearest FinanceContext.Provider value
  const context = useContext(FinanceContext)

  // give a clear error if a component uses this hook outside the provider
  if (!context) {
    throw new Error("useFinance must be used inside a FinanceProvider")
  }

  return context
}
