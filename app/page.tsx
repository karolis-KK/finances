"use client"

import Navbar from "./components/NavBar"
import { useFinance } from "./context/FinanceContext"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  createHorizontalChart,
  Label,
} from "recharts"
import { Transaction } from "@/types/finance"

export default function Home() {
  const { categories, transactions } = useFinance()

  type ChartData = {
    label: string
    amount: number
  }

  const months: ChartData[] = [
    { label: "Jan", amount: 0 },
    { label: "Feb", amount: 0 },
    { label: "Mar", amount: 0 },
    { label: "Apr", amount: 0 },
    { label: "May", amount: 0 },
    { label: "Jun", amount: 0 },
    { label: "Jul", amount: 0 },
    { label: "Aug", amount: 0 },
    { label: "Sep", amount: 0 },
    { label: "Oct", amount: 0 },
    { label: "Nov", amount: 0 },
    { label: "Dec", amount: 0 },
  ]

  // map() creates one result for each month.
  // filter() keeps transactions from the current month.
  // slice() extracts the month from each YYYY-MM-DD date, and Number() converts it to a number.
  // reduce() adds the matching transaction amounts into one monthly total.
  const generateData = (transactions: Transaction[]): ChartData[] => {
    return months.map((month, monthIndex) => ({
      ...month, amount: transactions.filter((transaction) => Number(transaction.date.slice(5, 7)) - 1 === monthIndex,).reduce((total, transaction) => total + transaction.amount, 0),
    }))
  }

  const data = generateData(transactions)

  const Typed = createHorizontalChart<ChartData, string, number>()({
    XAxis,
    YAxis,
    Tooltip,
    Line,
  })

  return (
    <section className="flex h-screen flex-col">
      <Navbar />
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-10 p-10">
        <div className="col-span-2 h-full min-w-0 rounded-md bg-[#ccc5b9] pt-12 pr-12">
          <Typed.LineChart
            style={{
              width: "100%",
              height: "100%",
            }}
            responsive
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 40,
              bottom: 50,
            }}
          >
            <CartesianGrid stroke="#6e6963" />
            <Typed.XAxis
              label={{
                value: "Month",
                position: "bottom",
                offset: 20,
                fill: "#252422",
              }}
              stroke="#403d39"
              dataKey="label"
            />
            <Typed.YAxis
              label={{
                value: "Amount",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
                fill: "#252422",
              }}
              stroke="#403d39"
              width="auto"
            />
            <Tooltip />
            <Typed.Line
              dataKey="amount"
              name="Amount"
              stroke="#eb5e28"
              offset="20"
            />
          </Typed.LineChart>
        </div>
        <div className="col-span-1 h-full rounded-md p-10 min-w-0 bg-[#ccc5b9]">
          w
        </div>
      </div>
    </section>
  )
}
