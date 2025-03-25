"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Morning HIIT",
    date: new Date(2024, 2, 25),
    type: "class",
    enrolled: true,
  },
  {
    id: 2,
    title: "Yoga Flow",
    date: new Date(2024, 2, 27),
    type: "class",
    enrolled: false,
  },
  {
    id: 3,
    title: "Personal Training",
    date: new Date(2024, 2, 26),
    type: "workout",
    enrolled: true,
  },
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showOnlyMyEvents, setShowOnlyMyEvents] = useState(false)

  const filteredEvents = showOnlyMyEvents ? mockEvents.filter((event) => event.enrolled) : mockEvents

  const selectedDateEvents = filteredEvents.filter((event) => date && event.date.toDateString() === date.toDateString())

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">View your scheduled workouts and classes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch id="show-my-events" checked={showOnlyMyEvents} onCheckedChange={setShowOnlyMyEvents} />
                <Label htmlFor="show-my-events">My Events Only</Label>
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
                                event.type === "class" ? "bg-primary" : "bg-primary/70"
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
                  <div key={event.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        event.type === "class"
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/80 text-primary-foreground"
                      }
                    >
                      {event.type === "class" ? "Class" : "Workout"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium">No Events</h3>
                <p className="mt-2 text-sm text-muted-foreground">No events scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

