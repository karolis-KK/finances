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
import { Category, Transaction } from "@/types/finance"

export default function Home() {
  const { categories, transactions } = useFinance()

  type Month = {
    label: string
    amount?: number
  }

  const data: Month[] = [
    { label: "Jan" },
    { label: "Feb" },
    { label: "Mar" },
    { label: "Apr" },
    { label: "May" },
    { label: "Jun" },
    { label: "Jul" },
    { label: "Aug" },
    { label: "Sep" },
    { label: "Oct" },
    { label: "Nov" },
    { label: "Dec" },
  ]

  const generateData = (
    categories: Category[],
    transactions: Transaction[],
  ): void => {
    data.map((item) => [...currentItems, { amount }])
  }

  type ChartData = {
    label: string
    x: number
  }

  const da: ChartData[] = [
    { label: "Jan", x: 400 },
    { label: "Feb", x: 300 },
    { label: "Mar", x: 200 },
    { label: "Apr", x: 278 },
    { label: "May", x: 189 },
    { label: "Jun", x: 239 },
    { label: "Jul", x: 239 },
    { label: "Aug", x: 239 },
    { label: "Sep", x: 239 },
    { label: "Oct", x: 239 },
    { label: "Nov", x: 239 },
    { label: "Dec", x: 220 },
  ]

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
              dataKey="x"
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
