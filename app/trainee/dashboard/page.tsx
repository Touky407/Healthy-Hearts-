"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, MessageSquare, Utensils, Users } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for meal nutrition
const weeklyMealData = [
  { day: "Mon", calories: 1850, protein: 95 },
  { day: "Tue", calories: 2100, protein: 110 },
  { day: "Wed", calories: 1950, protein: 105 },
  { day: "Thu", calories: 2200, protein: 115 },
  { day: "Fri", calories: 2050, protein: 100 },
  { day: "Sat", calories: 2300, protein: 120 },
  { day: "Sun", calories: 1900, protein: 90 },
]

const monthlyMealData = [
  { day: "Week 1", calories: 2050, protein: 102 },
  { day: "Week 2", calories: 2100, protein: 108 },
  { day: "Week 3", calories: 1950, protein: 98 },
  { day: "Week 4", calories: 2000, protein: 105 },
]

// Mock data for workout calories
const weeklyWorkoutData = [
  { day: "Mon", calories: 350, duration: 45 },
  { day: "Tue", calories: 280, duration: 30 },
  { day: "Wed", calories: 420, duration: 60 },
  { day: "Thu", calories: 0, duration: 0 },
  { day: "Fri", calories: 380, duration: 50 },
  { day: "Sat", calories: 520, duration: 75 },
  { day: "Sun", calories: 200, duration: 25 },
]

const monthlyWorkoutData = [
  { day: "Week 1", calories: 1430, duration: 185 },
  { day: "Week 2", calories: 1580, duration: 215 },
  { day: "Week 3", calories: 1350, duration: 170 },
  { day: "Week 4", calories: 1490, duration: 200 },
]

// Custom tooltip for the charts
const CustomMealTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`Calories: ${payload[0].value}`}</p>
        <p className="text-blue-500">{`Protein: ${payload[1].value}g`}</p>
      </div>
    )
  }
  return null
}

const CustomWorkoutTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`Calories: ${payload[0].value}`}</p>
        <p className="text-blue-500">{`Duration: ${payload[1].value} min`}</p>
      </div>
    )
  }
  return null
}

export default function TraineeDashboard() {
  const [mealTimeframe, setMealTimeframe] = useState<"week" | "month">("week")
  const [workoutTimeframe, setWorkoutTimeframe] = useState<"week" | "month">("week")

  const mealData = mealTimeframe === "week" ? weeklyMealData : monthlyMealData
  const workoutData = workoutTimeframe === "week" ? weeklyWorkoutData : monthlyWorkoutData

  return (
    <div className="p-4 md:p-6 mx-auto w-full max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Trainee Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Track your fitness journey.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-center">Daily Meal Upload</CardTitle>
            <div className="flex justify-center">
              <Utensils className="h-4 w-4 text-muted-foreground mt-1" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Breakfast</span>
                <span className="text-xs text-muted-foreground">
                  {false ? (
                    <span className="flex items-center text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Uploaded
                    </span>
                  ) : (
                    "Not uploaded"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Lunch</span>
                <span className="text-xs text-muted-foreground">
                  {false ? (
                    <span className="flex items-center text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Uploaded
                    </span>
                  ) : (
                    "Not uploaded"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dinner</span>
                <span className="text-xs text-muted-foreground">
                  {false ? (
                    <span className="flex items-center text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Uploaded
                    </span>
                  ) : (
                    "Not uploaded"
                  )}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/trainee/meals" className="w-full block">
                <Button size="sm" className="w-full">
                  Upload
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-center">Daily Workout</CardTitle>
            <div className="flex justify-center">
              <Dumbbell className="h-4 w-4 text-muted-foreground mt-1" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">workouts logged today</p>
            <div className="mt-4">
              <Link href="/trainee/workouts" className="w-full block">
                <Button size="sm" className="w-full">
                  Log
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-center">Upcoming Classes</CardTitle>
            <div className="flex justify-center">
              <Users className="h-4 w-4 text-muted-foreground mt-1" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">scheduled this week</p>
            <div className="mt-4">
              <Link href="/trainee/classes" className="w-full block">
                <Button size="sm" className="w-full">
                  Browse
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Nutrition Tracking</CardTitle>
              <CardDescription className="text-xs">Calories and protein intake</CardDescription>
            </div>
            <Select value={mealTimeframe} onValueChange={(value) => setMealTimeframe(value as "week" | "month")}>
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mealData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} domain={[0, "dataMax + 300"]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} domain={[0, "dataMax + 20"]} />
                  <Tooltip content={<CustomMealTooltip />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="calories"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="protein"
                    stroke="hsl(210, 100%, 50%)"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-xs">Calories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Protein (g)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">Workout Activity</CardTitle>
              <CardDescription className="text-xs">Calories burned and duration</CardDescription>
            </div>
            <Select value={workoutTimeframe} onValueChange={(value) => setWorkoutTimeframe(value as "week" | "month")}>
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={workoutData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} domain={[0, "dataMax + 100"]} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} domain={[0, "dataMax + 20"]} />
                  <Tooltip content={<CustomWorkoutTooltip />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="calories"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="duration"
                    stroke="hsl(210, 100%, 50%)"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-xs">Calories Burned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">Duration (min)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium text-center">Recent Activity</CardTitle>
            <CardDescription className="text-xs text-center">Your recent messages and notifications</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex flex-col items-center text-center">
            <MessageSquare className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <div className="mt-4 flex gap-4">
              <Link href="/trainee/chat">
                <Button variant="outline" size="sm">
                  Open Chat
                </Button>
              </Link>
              <Link href="/trainee/calendar">
                <Button variant="outline" size="sm">
                  View Calendar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

