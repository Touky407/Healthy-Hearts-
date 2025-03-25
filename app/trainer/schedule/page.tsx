"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

// Mock data for classes
const mockClasses = [
  {
    id: 1,
    title: "Morning HIIT",
    trainer: "John Smith",
    time: "Mon, Wed, Fri - 7:00 AM",
    location: "Main Studio",
    description: "High-intensity interval training to start your day right.",
    enrolledCount: 8,
  },
  {
    id: 2,
    title: "Yoga Flow",
    trainer: "Sarah Johnson",
    time: "Tue, Thu - 6:00 PM",
    location: "Yoga Room",
    description: "Relaxing yoga session to unwind after a long day.",
    enrolledCount: 12,
  },
  {
    id: 3,
    title: "Strength Training",
    trainer: "Mike Williams",
    time: "Mon, Wed, Fri - 5:30 PM",
    location: "Weight Room",
    description: "Focus on building strength and muscle mass.",
    enrolledCount: 6,
  },
  {
    id: 4,
    title: "Cardio Blast",
    trainer: "Emma Davis",
    time: "Sat - 9:00 AM",
    location: "Main Studio",
    description: "High-energy cardio workout to boost your metabolism.",
    enrolledCount: 10,
  },
]

export default function SchedulePage() {
  const [classes, setClasses] = useState(mockClasses)

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Schedule</h1>
          <p className="text-muted-foreground">Manage your group classes and events.</p>
        </div>
        <Link href="/trainer/schedule/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Post New Class
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{classItem.title}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  <Users className="mr-1 h-3 w-3" /> {classItem.enrolledCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Time:</span>
                    <span className="ml-1">{classItem.time}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Location:</span>
                    <span className="ml-1">{classItem.location}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{classItem.description}</p>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Roster
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

