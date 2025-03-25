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

// Mock data for workouts
const mockWorkouts = [
  {
    id: 1,
    traineeId: "1",
    date: new Date(2024, 2, 24),
    description: "30 min cardio, 3x10 squats, 3x10 push-ups, 3x10 lunges",
    timestamp: "8:30 AM",
    feedback: "",
  },
  {
    id: 2,
    traineeId: "1",
    date: new Date(2024, 2, 23),
    description: "45 min strength training, focus on upper body",
    timestamp: "5:00 PM",
    feedback: "Great progress on your upper body strength! Try increasing the weight for chest press next time.",
  },
  {
    id: 3,
    traineeId: "2",
    date: new Date(2024, 2, 24),
    description: "1 hour yoga session, focus on flexibility",
    timestamp: "7:00 AM",
    feedback: "",
  },
]

export default function ReviewWorkoutsPage() {
  const [selectedTrainee, setSelectedTrainee] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [feedback, setFeedback] = useState<string>("")
  const [workouts, setWorkouts] = useState(mockWorkouts)

  const filteredWorkouts = workouts.filter(
    (workout) =>
      (!selectedTrainee || workout.traineeId === selectedTrainee) &&
      (!selectedDate || workout.date.toDateString() === selectedDate.toDateString()),
  )

  const handleSendFeedback = (workoutId: number) => {
    setWorkouts(workouts.map((workout) => (workout.id === workoutId ? { ...workout, feedback } : workout)))
    setFeedback("")
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Trainee Workout Review</h1>
        <p className="text-muted-foreground">Review and provide feedback on trainee workouts.</p>
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

      {filteredWorkouts.length > 0 ? (
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => {
            const trainee = trainees.find((t) => t.id === workout.traineeId)

            return (
              <Card key={workout.id}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle>
                      {trainee?.name} - {format(workout.date, "PPP")}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">{workout.timestamp}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Workout Description</h3>
                      <div className="rounded-lg bg-muted p-3">
                        <p>{workout.description}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Feedback</h3>
                      {workout.feedback ? (
                        <div className="rounded-lg bg-muted p-3">
                          <p>{workout.feedback}</p>
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
                            onClick={() => handleSendFeedback(workout.id)}
                            className="w-full"
                            disabled={!feedback.trim()}
                          >
                            <Send className="mr-2 h-4 w-4" /> Send Feedback
                          </Button>
                        </div>
                      )}
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
              <CalendarIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No Workouts Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No workouts match your current filters. Try adjusting your selection.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

