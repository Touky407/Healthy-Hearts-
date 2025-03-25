"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Users, Clock, MapPin, Plus, ChevronRight } from "lucide-react"
import Link from "next/link"

// Mock data for classes and events
const mockClasses = [
  {
    id: 1,
    title: "Morning HIIT",
    date: new Date(2024, 2, 25),
    time: "7:00 AM - 7:45 AM",
    location: "Main Studio",
    enrolledCount: 8,
    maxCapacity: 12,
    type: "class",
  },
  {
    id: 2,
    title: "Yoga Flow",
    date: new Date(2024, 2, 27),
    time: "6:00 PM - 7:00 PM",
    location: "Yoga Room",
    enrolledCount: 12,
    maxCapacity: 15,
    type: "class",
  },
  {
    id: 3,
    title: "Strength Training",
    date: new Date(2024, 2, 26),
    time: "5:30 PM - 6:20 PM",
    location: "Weight Room",
    enrolledCount: 6,
    maxCapacity: 10,
    type: "class",
  },
  {
    id: 4,
    title: "Personal Training - Alex Johnson",
    date: new Date(2024, 2, 26),
    time: "10:00 AM - 11:00 AM",
    location: "Training Room 2",
    type: "appointment",
  },
  {
    id: 5,
    title: "Personal Training - Jamie Smith",
    date: new Date(2024, 2, 28),
    time: "2:00 PM - 3:00 PM",
    location: "Training Room 1",
    type: "appointment",
  },
  {
    id: 6,
    title: "Cardio Blast",
    date: new Date(2024, 2, 29),
    time: "9:00 AM - 9:40 AM",
    location: "Main Studio",
    enrolledCount: 10,
    maxCapacity: 15,
    type: "class",
  },
]

// Mock data for trainees enrolled in classes
const mockEnrollments = {
  1: [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", initials: "AJ" },
    { id: 2, name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40", initials: "JS" },
    { id: 3, name: "Taylor Brown", avatar: "/placeholder.svg?height=40&width=40", initials: "TB" },
    { id: 4, name: "Jordan Lee", avatar: "/placeholder.svg?height=40&width=40", initials: "JL" },
    { id: 5, name: "Casey Morgan", avatar: "/placeholder.svg?height=40&width=40", initials: "CM" },
    { id: 6, name: "Riley Wilson", avatar: "/placeholder.svg?height=40&width=40", initials: "RW" },
    { id: 7, name: "Quinn Adams", avatar: "/placeholder.svg?height=40&width=40", initials: "QA" },
    { id: 8, name: "Morgan Chen", avatar: "/placeholder.svg?height=40&width=40", initials: "MC" },
  ],
  2: [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", initials: "AJ" },
    { id: 2, name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40", initials: "JS" },
    { id: 9, name: "Sam Taylor", avatar: "/placeholder.svg?height=40&width=40", initials: "ST" },
    { id: 10, name: "Jordan Parker", avatar: "/placeholder.svg?height=40&width=40", initials: "JP" },
    { id: 11, name: "Alex Rivera", avatar: "/placeholder.svg?height=40&width=40", initials: "AR" },
    { id: 12, name: "Taylor Jones", avatar: "/placeholder.svg?height=40&width=40", initials: "TJ" },
    { id: 13, name: "Casey Smith", avatar: "/placeholder.svg?height=40&width=40", initials: "CS" },
    { id: 14, name: "Riley Brown", avatar: "/placeholder.svg?height=40&width=40", initials: "RB" },
    { id: 15, name: "Quinn Wilson", avatar: "/placeholder.svg?height=40&width=40", initials: "QW" },
    { id: 16, name: "Morgan Lee", avatar: "/placeholder.svg?height=40&width=40", initials: "ML" },
    { id: 17, name: "Jordan Chen", avatar: "/placeholder.svg?height=40&width=40", initials: "JC" },
    { id: 18, name: "Sam Adams", avatar: "/placeholder.svg?height=40&width=40", initials: "SA" },
  ],
  3: [
    { id: 3, name: "Taylor Brown", avatar: "/placeholder.svg?height=40&width=40", initials: "TB" },
    { id: 4, name: "Jordan Lee", avatar: "/placeholder.svg?height=40&width=40", initials: "JL" },
    { id: 5, name: "Casey Morgan", avatar: "/placeholder.svg?height=40&width=40", initials: "CM" },
    { id: 9, name: "Sam Taylor", avatar: "/placeholder.svg?height=40&width=40", initials: "ST" },
    { id: 10, name: "Jordan Parker", avatar: "/placeholder.svg?height=40&width=40", initials: "JP" },
    { id: 11, name: "Alex Rivera", avatar: "/placeholder.svg?height=40&width=40", initials: "AR" },
  ],
  6: [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", initials: "AJ" },
    { id: 2, name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40", initials: "JS" },
    { id: 3, name: "Taylor Brown", avatar: "/placeholder.svg?height=40&width=40", initials: "TB" },
    { id: 12, name: "Taylor Jones", avatar: "/placeholder.svg?height=40&width=40", initials: "TJ" },
    { id: 13, name: "Casey Smith", avatar: "/placeholder.svg?height=40&width=40", initials: "CS" },
    { id: 14, name: "Riley Brown", avatar: "/placeholder.svg?height=40&width=40", initials: "RB" },
    { id: 15, name: "Quinn Wilson", avatar: "/placeholder.svg?height=40&width=40", initials: "QW" },
    { id: 16, name: "Morgan Lee", avatar: "/placeholder.svg?height=40&width=40", initials: "ML" },
    { id: 17, name: "Jordan Chen", avatar: "/placeholder.svg?height=40&width=40", initials: "JC" },
    { id: 18, name: "Sam Adams", avatar: "/placeholder.svg?height=40&width=40", initials: "SA" },
  ],
}

export default function TrainerCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showOnlyMyEvents, setShowOnlyMyEvents] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [view, setView] = useState<"calendar" | "list">("calendar")

  // Filter events based on selected date and filter settings
  const filteredEvents = mockClasses.filter((event) => !showOnlyMyEvents || event.type === "appointment")

  const selectedDateEvents = filteredEvents.filter((event) => date && event.date.toDateString() === date.toDateString())

  // Get the selected event details
  const eventDetails = selectedEvent ? mockClasses.find((event) => event.id === selectedEvent) : null
  const enrolledTrainees =
    eventDetails && eventDetails.type === "class"
      ? mockEnrollments[eventDetails.id as keyof typeof mockEnrollments] || []
      : []

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">Manage your classes, appointments, and schedule.</p>
      </div>

      <div className="flex justify-end mb-4">
        <Tabs value={view} onValueChange={(v) => setView(v as "calendar" | "list")} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch id="show-my-events" checked={showOnlyMyEvents} onCheckedChange={setShowOnlyMyEvents} />
                <Label htmlFor="show-my-events">Appointments Only</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              components={{
                DayContent: (props) => {
                  // Safely handle the day props
                  if (!props || !props.day) {
                    return <div className="h-9 w-9 p-0 font-normal aria-selected:opacity-100">-</div>
                  }

                  // Extract date components safely
                  const day = props.day.day || 1
                  const month = (props.day.month || 1) - 1 // Month is 1-indexed in the props
                  const year = props.day.year || 2024

                  // Find events for this day
                  const dayEvents = filteredEvents.filter(
                    (event) =>
                      event.date.getDate() === day &&
                      event.date.getMonth() === month &&
                      event.date.getFullYear() === year,
                  )

                  return (
                    <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                      <div className="flex h-full w-full items-center justify-center">{day}</div>
                      {dayEvents.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`h-1 w-1 rounded-full ${
                                event.type === "appointment" ? "bg-primary" : "bg-primary/70"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                },
              }}
            />
          </CardContent>
        </Card>

        {view === "calendar" ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? <span>Events for {date.toLocaleDateString()}</span> : <span>Select a date</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors ${
                        selectedEvent === event.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedEvent(event.id)}
                    >
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          variant="outline"
                          className={
                            event.type === "appointment"
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/80 text-primary-foreground"
                          }
                        >
                          {event.type === "appointment" ? "Appointment" : "Class"}
                        </Badge>
                        {event.type === "class" && (
                          <div className="flex items-center mt-2 text-sm text-muted-foreground">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {event.enrolledCount}/{event.maxCapacity}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Events</h3>
                  <p className="mt-2 text-sm text-muted-foreground">No events scheduled for this date</p>
                  <Link href="/trainer/schedule/new">
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" /> Add New Class
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Your upcoming classes and appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Array.from(new Set(filteredEvents.map((event) => event.date.toDateString())))
                  .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                  .slice(0, 5)
                  .map((dateString) => (
                    <div key={dateString}>
                      <h3 className="font-medium text-sm mb-2">
                        {new Date(dateString).toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <div className="space-y-2">
                        {filteredEvents
                          .filter((event) => event.date.toDateString() === dateString)
                          .sort((a, b) => {
                            const timeA = a.time.split(" - ")[0]
                            const timeB = b.time.split(" - ")[0]
                            return timeA.localeCompare(timeB)
                          })
                          .map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:border-primary transition-colors"
                              onClick={() => {
                                setDate(event.date)
                                setSelectedEvent(event.id)
                                setView("calendar")
                              }}
                            >
                              <div>
                                <div className="font-medium">{event.title}</div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  {event.time}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedEvent && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{eventDetails?.title}</CardTitle>
              <Badge
                variant="outline"
                className={
                  eventDetails?.type === "appointment"
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/80 text-primary-foreground"
                }
              >
                {eventDetails?.type === "appointment" ? "Appointment" : "Class"}
              </Badge>
            </div>
            <CardDescription>
              <div className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {eventDetails?.date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
              </div>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 mr-1" />
                {eventDetails?.time}
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {eventDetails?.location}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {eventDetails?.type === "class" && (
              <div>
                <h3 className="font-medium mb-3">
                  Enrolled Trainees ({enrolledTrainees.length}/{eventDetails.maxCapacity})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {enrolledTrainees.map((trainee) => (
                    <div key={trainee.id} className="flex items-center p-2 rounded-md border">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 text-xs font-medium">
                        {trainee.initials}
                      </div>
                      <span className="text-sm truncate">{trainee.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline">Edit Class</Button>
                  <Link href={`/trainer/chat?trainee=${enrolledTrainees[0]?.id}`}>
                    <Button>Message Trainees</Button>
                  </Link>
                </div>
              </div>
            )}
            {eventDetails?.type === "appointment" && (
              <div>
                <h3 className="font-medium mb-3">Appointment Details</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Personal training session with {eventDetails.title.split(" - ")[1]}
                </p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Reschedule</Button>
                  <Link href="/trainer/chat">
                    <Button>Message Trainee</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

