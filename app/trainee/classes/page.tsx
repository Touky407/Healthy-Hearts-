"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Users } from "lucide-react"

// Mock data for available classes
const mockClasses = [
  {
    id: 1,
    title: "Morning HIIT",
    trainer: "John Smith",
    time: "Mon, Wed, Fri - 7:00 AM",
    location: "Main Studio",
    description: "High-intensity interval training to start your day right.",
  },
  {
    id: 2,
    title: "Yoga Flow",
    trainer: "Sarah Johnson",
    time: "Tue, Thu - 6:00 PM",
    location: "Yoga Room",
    description: "Relaxing yoga session to unwind after a long day.",
  },
  {
    id: 3,
    title: "Strength Training",
    trainer: "Mike Williams",
    time: "Mon, Wed, Fri - 5:30 PM",
    location: "Weight Room",
    description: "Focus on building strength and muscle mass.",
  },
  {
    id: 4,
    title: "Cardio Blast",
    trainer: "Emma Davis",
    time: "Sat - 9:00 AM",
    location: "Main Studio",
    description: "High-energy cardio workout to boost your metabolism.",
  },
]

export default function ClassesPage() {
  const [signedUpClasses, setSignedUpClasses] = useState<number[]>([])

  const handleSignUp = (classId: number) => {
    if (signedUpClasses.includes(classId)) {
      setSignedUpClasses(signedUpClasses.filter((id) => id !== classId))
    } else {
      setSignedUpClasses([...signedUpClasses, classId])
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Group & Class Signup</h1>
        <p className="text-muted-foreground">Browse and sign up for available classes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((classItem) => (
          <Card key={classItem.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{classItem.title}</CardTitle>
                {signedUpClasses.includes(classItem.id) && (
                  <Badge className="ml-2 bg-primary hover:bg-primary/90">
                    <Check className="mr-1 h-3 w-3" /> Signed Up
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Trainer:</span>
                    <span className="ml-1">{classItem.trainer}</span>
                  </div>
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

                <Button
                  onClick={() => handleSignUp(classItem.id)}
                  variant={signedUpClasses.includes(classItem.id) ? "outline" : "default"}
                  className="w-full"
                >
                  {signedUpClasses.includes(classItem.id) ? "Cancel Signup" : "Sign Up"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

