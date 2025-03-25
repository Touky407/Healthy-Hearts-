"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, Clock, Dumbbell, Flame, Check, Info } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for enrolled classes
const enrolledClasses = [
  {
    id: 1,
    name: "Morning HIIT",
    trainer: "John Smith",
    time: "Mon, Wed, Fri - 7:00 AM",
    location: "Main Studio",
    duration: 45,
    caloriesBurnedPerMinute: 10,
    description: "High-intensity interval training to start your day right.",
    lastSession: new Date(2024, 2, 24),
  },
  {
    id: 2,
    name: "Yoga Flow",
    trainer: "Sarah Johnson",
    time: "Tue, Thu - 6:00 PM",
    location: "Yoga Room",
    duration: 60,
    caloriesBurnedPerMinute: 5,
    description: "Relaxing yoga session to unwind after a long day.",
    lastSession: new Date(2024, 2, 23),
  },
  {
    id: 3,
    name: "Strength Training",
    trainer: "Mike Williams",
    time: "Mon, Wed, Fri - 5:30 PM",
    location: "Weight Room",
    duration: 50,
    caloriesBurnedPerMinute: 8,
    description: "Focus on building strength and muscle mass.",
    lastSession: new Date(2024, 2, 22),
  },
  {
    id: 4,
    name: "Cardio Blast",
    trainer: "Emma Davis",
    time: "Sat - 9:00 AM",
    location: "Main Studio",
    duration: 40,
    caloriesBurnedPerMinute: 12,
    description: "High-energy cardio workout to boost your metabolism.",
    lastSession: new Date(2024, 2, 20),
  },
]

// Mock data for common workouts
const commonWorkouts = [
  { id: 1, name: "Running", caloriesPerMinute: 10, type: "cardio" },
  { id: 2, name: "Walking", caloriesPerMinute: 5, type: "cardio" },
  { id: 3, name: "Cycling", caloriesPerMinute: 8, type: "cardio" },
  { id: 4, name: "Swimming", caloriesPerMinute: 9, type: "cardio" },
  { id: 5, name: "Weight Training", caloriesPerMinute: 7, type: "strength" },
  { id: 6, name: "Yoga", caloriesPerMinute: 4, type: "flexibility" },
  { id: 7, name: "Pilates", caloriesPerMinute: 5, type: "flexibility" },
  { id: 8, name: "HIIT", caloriesPerMinute: 12, type: "cardio" },
  { id: 9, name: "Elliptical", caloriesPerMinute: 7, type: "cardio" },
  { id: 10, name: "Stair Climber", caloriesPerMinute: 9, type: "cardio" },
  { id: 11, name: "Jump Rope", caloriesPerMinute: 11, type: "cardio" },
  { id: 12, name: "Boxing", caloriesPerMinute: 10, type: "cardio" },
  { id: 13, name: "Dancing", caloriesPerMinute: 7, type: "cardio" },
  { id: 14, name: "Rowing", caloriesPerMinute: 8, type: "cardio" },
  { id: 15, name: "CrossFit", caloriesPerMinute: 12, type: "strength" },
]

// Intensity levels for calorie adjustment
const intensityLevels = [
  { id: "low", name: "Low", multiplier: 0.8 },
  { id: "medium", name: "Medium", multiplier: 1.0 },
  { id: "high", name: "High", multiplier: 1.2 },
]

export default function WorkoutUploadPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [workouts, setWorkouts] = useState<Array<{ id: number; description: string; date: Date; calories: number }>>([])
  const [description, setDescription] = useState("")
  const [inputMethod, setInputMethod] = useState("class")
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null)
  const [workoutDuration, setWorkoutDuration] = useState(30)
  const [intensity, setIntensity] = useState("medium")
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [openWorkoutSelector, setOpenWorkoutSelector] = useState(false)

  // Calculate calories burned based on workout selection and duration
  useEffect(() => {
    if (inputMethod === "class" && selectedClass) {
      const classData = enrolledClasses.find((c) => c.id === selectedClass)
      if (classData) {
        setCaloriesBurned(Math.round(classData.caloriesBurnedPerMinute * classData.duration))
        setWorkoutDuration(classData.duration)
        setDescription(classData.description)
      }
    } else if (inputMethod === "common" && selectedWorkout) {
      const workout = commonWorkouts.find((w) => w.id === selectedWorkout)
      const intensityData = intensityLevels.find((i) => i.id === intensity)
      if (workout && intensityData) {
        setCaloriesBurned(Math.round(workout.caloriesPerMinute * workoutDuration * intensityData.multiplier))
      }
    }
  }, [inputMethod, selectedClass, selectedWorkout, workoutDuration, intensity])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let workoutDescription = description

    if (inputMethod === "class" && selectedClass) {
      const classData = enrolledClasses.find((c) => c.id === selectedClass)
      if (classData) {
        workoutDescription = `${classData.name} class with ${classData.trainer}`
      }
    } else if (inputMethod === "common" && selectedWorkout) {
      const workout = commonWorkouts.find((w) => w.id === selectedWorkout)
      if (workout) {
        workoutDescription = `${workout.name} - ${workoutDuration} minutes (${intensity} intensity)`
      }
    }

    if (
      (inputMethod === "class" && selectedClass) ||
      (inputMethod === "common" && selectedWorkout) ||
      (inputMethod === "custom" && description)
    ) {
      setWorkouts([
        ...workouts,
        {
          id: Date.now(),
          description: workoutDescription,
          date,
          calories: caloriesBurned,
        },
      ])

      // Reset form
      if (inputMethod === "custom") {
        setDescription("")
      }
      setIsComplete(true)

      // Reset complete status after 3 seconds
      setTimeout(() => {
        setIsComplete(false)
      }, 3000)
    }
  }

  const handleWorkoutSelect = (workoutId: number) => {
    setSelectedWorkout(workoutId)
    setOpenWorkoutSelector(false)
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Daily Workout Upload</h1>
        <p className="text-muted-foreground">Log your workouts and track your progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Workout</CardTitle>
            <CardDescription>Record your workout details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-base font-medium">Workout Type</Label>
                <Tabs
                  defaultValue="class"
                  className="w-full mt-2"
                  value={inputMethod}
                  onValueChange={(value) => {
                    setInputMethod(value)
                    setSelectedClass(null)
                    setSelectedWorkout(null)
                    setDescription("")
                    setCaloriesBurned(0)
                  }}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="class">Class Workout</TabsTrigger>
                    <TabsTrigger value="common">Common Workout</TabsTrigger>
                    <TabsTrigger value="custom">Custom Workout</TabsTrigger>
                  </TabsList>

                  {/* Class Workout Tab */}
                  <TabsContent value="class" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="class-select">Select Class</Label>
                      <Select
                        value={selectedClass?.toString() || ""}
                        onValueChange={(value) => setSelectedClass(Number.parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class you've attended" />
                        </SelectTrigger>
                        <SelectContent>
                          {enrolledClasses.map((classItem) => (
                            <SelectItem key={classItem.id} value={classItem.id.toString()}>
                              {classItem.name} - {format(classItem.lastSession, "MMM d")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedClass && (
                      <div className="rounded-lg border p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{enrolledClasses.find((c) => c.id === selectedClass)?.name}</div>
                          <Badge variant="outline">
                            {enrolledClasses.find((c) => c.id === selectedClass)?.duration} min
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Trainer: {enrolledClasses.find((c) => c.id === selectedClass)?.trainer}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Location: {enrolledClasses.find((c) => c.id === selectedClass)?.location}
                        </div>
                        <div className="flex items-center text-sm">
                          <Flame className="h-4 w-4 mr-1 text-primary" />
                          <span>Estimated calories: {caloriesBurned}</span>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Common Workout Tab */}
                  <TabsContent value="common" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Select Workout</Label>
                      <Popover open={openWorkoutSelector} onOpenChange={setOpenWorkoutSelector}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            {selectedWorkout
                              ? commonWorkouts.find((w) => w.id === selectedWorkout)?.name
                              : "Select a workout"}
                            <Dumbbell className="h-4 w-4 ml-2" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="start" side="bottom" sideOffset={5}>
                          <Command>
                            <CommandInput placeholder="Search workouts..." />
                            <CommandList>
                              <CommandEmpty>No workout found.</CommandEmpty>
                              <CommandGroup heading="Cardio">
                                {commonWorkouts
                                  .filter((workout) => workout.type === "cardio")
                                  .map((workout) => (
                                    <CommandItem
                                      key={workout.id}
                                      value={workout.name}
                                      onSelect={() => handleWorkoutSelect(workout.id)}
                                    >
                                      <span>{workout.name}</span>
                                      <span className="ml-2 text-xs text-muted-foreground">
                                        ({workout.caloriesPerMinute} cal/min)
                                      </span>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                              <CommandGroup heading="Strength">
                                {commonWorkouts
                                  .filter((workout) => workout.type === "strength")
                                  .map((workout) => (
                                    <CommandItem
                                      key={workout.id}
                                      value={workout.name}
                                      onSelect={() => handleWorkoutSelect(workout.id)}
                                    >
                                      <span>{workout.name}</span>
                                      <span className="ml-2 text-xs text-muted-foreground">
                                        ({workout.caloriesPerMinute} cal/min)
                                      </span>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                              <CommandGroup heading="Flexibility">
                                {commonWorkouts
                                  .filter((workout) => workout.type === "flexibility")
                                  .map((workout) => (
                                    <CommandItem
                                      key={workout.id}
                                      value={workout.name}
                                      onSelect={() => handleWorkoutSelect(workout.id)}
                                    >
                                      <span>{workout.name}</span>
                                      <span className="ml-2 text-xs text-muted-foreground">
                                        ({workout.caloriesPerMinute} cal/min)
                                      </span>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {selectedWorkout && (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="workout-duration">Duration (minutes)</Label>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{workoutDuration} min</span>
                            </div>
                          </div>
                          <Input
                            id="workout-duration"
                            type="range"
                            min="5"
                            max="120"
                            step="5"
                            value={workoutDuration}
                            onChange={(e) => setWorkoutDuration(Number.parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>5 min</span>
                            <span>60 min</span>
                            <span>120 min</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Intensity Level</Label>
                          <RadioGroup
                            defaultValue="medium"
                            className="grid grid-cols-3 gap-4 mt-2"
                            value={intensity}
                            onValueChange={setIntensity}
                          >
                            {intensityLevels.map((level) => (
                              <div key={level.id}>
                                <RadioGroupItem value={level.id} id={level.id} className="peer sr-only" />
                                <Label
                                  htmlFor={level.id}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <span>{level.name}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="rounded-lg border p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <Flame className="h-5 w-5 mr-2 text-primary" />
                            <span className="font-medium">Estimated Calories Burned</span>
                          </div>
                          <div className="text-xl font-bold">{caloriesBurned}</div>
                        </div>
                      </>
                    )}
                  </TabsContent>

                  {/* Custom Workout Tab */}
                  <TabsContent value="custom" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="workout-description">Workout Description</Label>
                      <Textarea
                        id="workout-description"
                        placeholder="Describe your workout (e.g., exercises, sets, reps, duration)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="custom-duration">Duration (minutes)</Label>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{workoutDuration} min</span>
                        </div>
                      </div>
                      <Input
                        id="custom-duration"
                        type="range"
                        min="5"
                        max="120"
                        step="5"
                        value={workoutDuration}
                        onChange={(e) => setWorkoutDuration(Number.parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 min</span>
                        <span>60 min</span>
                        <span>120 min</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Intensity Level</Label>
                      <RadioGroup
                        defaultValue="medium"
                        className="grid grid-cols-3 gap-4 mt-2"
                        value={intensity}
                        onValueChange={setIntensity}
                      >
                        {intensityLevels.map((level) => (
                          <div key={level.id}>
                            <RadioGroupItem value={level.id} id={`custom-${level.id}`} className="peer sr-only" />
                            <Label
                              htmlFor={`custom-${level.id}`}
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <span>{level.name}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="custom-calories">Calories Burned</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Estimated based on duration and intensity</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="custom-calories"
                        type="number"
                        value={caloriesBurned}
                        onChange={(e) => setCaloriesBurned(Number.parseInt(e.target.value) || 0)}
                        className="w-full"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  (inputMethod === "class" && !selectedClass) ||
                  (inputMethod === "common" && !selectedWorkout) ||
                  (inputMethod === "custom" && !description) ||
                  isComplete
                }
              >
                {isComplete ? (
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4" /> Workout Added
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Add Workout
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            {workouts.length > 0 ? (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{format(workout.date, "PPP")}</div>
                      <Badge variant="outline" className="flex items-center">
                        <Flame className="h-3 w-3 mr-1 text-primary" />
                        {workout.calories} cal
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">{workout.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Dumbbell className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No Workouts Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add your first workout to start tracking your progress
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

