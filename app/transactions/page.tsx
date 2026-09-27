"use client"

import Navbar from "../components/NavBar"
import Footer from "../components/Footer"
import { useFinance } from "../context/FinanceContext"

export default function TransactionsPage() {
    const { categories, transactions } = useFinance()

    return (
        <section className="h-screen">
            <Navbar />
            <p>
                {transactions.length} transactions across {categories.length} categories
            </p>
            
        </section>
    )
}