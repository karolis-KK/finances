"use client"

import Navbar from "./components/NavBar"
import { useFinance } from "./context/FinanceContext"
import {
  Bar,
  BarChart,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  createHorizontalChart,
} from "recharts"
import type { PieLabelRenderProps } from "recharts"
import { Category, Transaction } from "@/types/finance"
import { useState } from "react"

export default function Home() {
  const { categories, transactions } = useFinance()

  type ChartData = {
    label: string
    amount: number
  }

  type CategoryChartData = {
    name: string
    amount: number
    percentage: number
    fill: string
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

  const [currentMonth, setCurrentMonth] = useState("Jan");

  const monthsSelect = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  // map() creates one result for each month.
  // filter() keeps transactions from the current month.
  // slice() extracts the month from each YYYY-MM-DD date, and Number() converts it to a number.
  // reduce() adds the matching transaction amounts into one monthly total.
  const generateData = (transactions: Transaction[]): ChartData[] => {
    return months.map((month, monthIndex) => ({
      ...month,
      amount: transactions
        .filter(
          (transaction) =>
            Number(transaction.date.slice(5, 7)) - 1 === monthIndex,
        )
        .reduce((total, transaction) => total + transaction.amount, 0),
    }))
  }

  const data = generateData(transactions)

  const selectedMonthIndex = monthsSelect.indexOf(currentMonth)
  const selectedMonthCategoryData: CategoryChartData[] = categories.map(
    (category) => {
      const amount = transactions
        .filter(
          (transaction) =>
            Number(transaction.date.slice(5, 7)) - 1 === selectedMonthIndex &&
            transaction.categoryId === category.id,
        )
        .reduce((total, transaction) => total + transaction.amount, 0)

      return {
        name: category.name,
        amount,
        percentage: 0,
        fill: category.color ?? "#eb5e28",
      }
    },
  )
  const selectedMonthTotal = selectedMonthCategoryData.reduce(
    (total, category) => total + category.amount,
    0,
  )
  const categoryChartData = selectedMonthCategoryData.map((category) => ({
    ...category,
    percentage:
      selectedMonthTotal === 0
        ? 0
        : (category.amount / selectedMonthTotal) * 100,
  }))

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    if (
      typeof cx !== "number" ||
      typeof cy !== "number" ||
      typeof midAngle !== "number" ||
      typeof outerRadius !== "number" ||
      typeof percent !== "number" ||
      percent === 0
    ) {
      return null
    }

    const radius = outerRadius + 18
    const radians = Math.PI / 180
    const x = cx + radius * Math.cos(-midAngle * radians)
    const y = cy + radius * Math.sin(-midAngle * radians)

    return (
      <text
        x={x}
        y={y}
        fill="#252422"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }

  const Typed = createHorizontalChart<ChartData, string, number>()({
    XAxis,
    YAxis,
    Tooltip,
    Line,
  })

  return (
    <section className="flex min-h-screen flex-col">
      <Navbar />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-3 lg:gap-10 lg:p-10">
        <div className="h-80 min-w-0 rounded-md bg-[#ccc5b9] p-4 sm:h-96 sm:p-6 lg:col-span-2 lg:h-full lg:pt-12 lg:pr-12">
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
        <div className="h-auto min-w-0 overflow-y-auto rounded-md bg-[#ccc5b9] p-4 text-[#252422] sm:p-6 lg:col-span-1 lg:h-full lg:p-10">
          <label htmlFor="month-select">Select month</label>
          <select onChange={(e) => setCurrentMonth(e.target.value)} value={currentMonth} name="month-select" id="month-select" className="border border-[#403d39]/20 mt-1 w-full pl-2 pt-2 pb-2 pr-2 rounded-md focus:outline-none focus:ring-0">
            {monthsSelect.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <h2 className="mt-8 text-lg text-[#252422]">
            Category share for {currentMonth}
          </h2>
          <div className="mt-2 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryChartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 70 }}
              >
                <CartesianGrid stroke="#6e6963" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  stroke="#403d39"
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  stroke="#403d39"
                />
                <Tooltip
                  formatter={(value, name) =>
                    name === "Share"
                      ? [`${Number(value).toFixed(1)}%`, name]
                      : [value, name]
                  }
                />
                <Bar dataKey="percentage" name="Share">
                  {categoryChartData.map((category) => (
                    <Cell key={category.name} fill={category.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="72%"
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {categoryChartData.map((category) => (
                    <Cell key={category.name} fill={category.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${Number(value).toFixed(2)} €`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
