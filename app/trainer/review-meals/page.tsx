"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Send } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for trainees
const trainees = [
  { id: "1", name: "Alex Johnson" },
  { id: "2", name: "Jamie Smith" },
  { id: "3", name: "Taylor Brown" },
]

// Mock data for meals
const mockMeals = [
  {
    id: 1,
    traineeId: "1",
    date: new Date(2024, 2, 24),
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "Grilled chicken with quinoa and vegetables",
    nutrition: {
      calories: 450,
      protein: 35,
      carbs: 40,
      fats: 15,
    },
    feedback: "",
  },
  {
    id: 2,
    traineeId: "1",
    date: new Date(2024, 2, 23),
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "Protein smoothie with banana and berries",
    nutrition: {
      calories: 320,
      protein: 25,
      carbs: 35,
      fats: 10,
    },
    feedback: "Great pre-workout meal! Try adding some chia seeds for extra nutrients.",
  },
  {
    id: 3,
    traineeId: "2",
    date: new Date(2024, 2, 24),
    imageUrl: "/placeholder.svg?height=300&width=400",
    description: "Salmon with sweet potato and broccoli",
    nutrition: {
      calories: 520,
      protein: 30,
      carbs: 45,
      fats: 22,
    },
    feedback: "",
  },
]

export default function ReviewMealsPage() {
  const [selectedTrainee, setSelectedTrainee] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [feedback, setFeedback] = useState<string>("")
  const [meals, setMeals] = useState(mockMeals)

  const filteredMeals = meals.filter(
    (meal) =>
      (!selectedTrainee || meal.traineeId === selectedTrainee) &&
      (!selectedDate || meal.date.toDateString() === selectedDate.toDateString()),
  )

  const handleSendFeedback = (mealId: number) => {
    setMeals(meals.map((meal) => (meal.id === mealId ? { ...meal, feedback } : meal)))
    setFeedback("")
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Trainee Meal Review</h1>
        <p className="text-muted-foreground">Review and provide feedback on trainee meals.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div>
          <Label htmlFor="trainee-select">Select Trainee</Label>
          <Select value={selectedTrainee} onValueChange={setSelectedTrainee}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select trainee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trainees</SelectItem>
              {trainees.map((trainee) => (
                <SelectItem key={trainee.id} value={trainee.id}>
                  {trainee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="date-select">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "mt-2 w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setSelectedTrainee("")
              setSelectedDate(undefined)
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {filteredMeals.length > 0 ? (
        <div className="space-y-8">
          {filteredMeals.map((meal) => {
            const trainee = trainees.find((t) => t.id === meal.traineeId)

            return (
              <Card key={meal.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle>
                      {trainee?.name} - {format(meal.date, "PPP")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img
                          src={meal.imageUrl || "/placeholder.svg"}
                          alt="Meal"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <p className="text-sm">{meal.description}</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Nutrition Analysis</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium text-muted-foreground">Calories</div>
                            <div className="text-2xl font-bold">{meal.nutrition.calories}</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium text-muted-foreground">Protein</div>
                            <div className="text-2xl font-bold">{meal.nutrition.protein}g</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium text-muted-foreground">Carbs</div>
                            <div className="text-2xl font-bold">{meal.nutrition.carbs}g</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium text-muted-foreground">Fats</div>
                            <div className="text-2xl font-bold">{meal.nutrition.fats}g</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Feedback</h3>
                        {meal.feedback ? (
                          <div className="rounded-lg bg-muted p-3">
                            <p>{meal.feedback}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Enter your feedback..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              rows={3}
                            />
                            <Button
                              onClick={() => handleSendFeedback(meal.id)}
                              className="w-full"
                              disabled={!feedback.trim()}
                            >
                              <Send className="mr-2 h-4 w-4" /> Send Feedback
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
            <div className="rounded-full bg-muted p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-muted-foreground"
              >
                <path d="M4 11h16a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 12.5V12a1 1 0 0 1 1-1Z" />
                <path d="M5 15h14a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 5 16.5V16a1 1 0 0 1 1-1Z" />
                <path d="M6 19h12a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 20.5V20a1 1 0 0 1 1-1Z" />
                <path d="M4 15V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v11" />
                <path d="M7 7h10" />
                <path d="M7 11h10" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">No Meals Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No meals match your current filters. Try adjusting your selection.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

