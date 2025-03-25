"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Mock data for trainees
const trainees = [
  { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", initials: "AJ" },
  { id: "2", name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40", initials: "JS" },
  { id: "3", name: "Taylor Brown", avatar: "/placeholder.svg?height=40&width=40", initials: "TB" },
]

// Mock data for chat messages
const initialChats: Record<string, Array<{ id: number; sender: string; content: string; timestamp: Date }>> = {
  "1": [
    {
      id: 1,
      sender: "trainer",
      content: "Hi Alex! How's your training going?",
      timestamp: new Date(2024, 2, 24, 10, 30),
    },
    {
      id: 2,
      sender: "trainee",
      content: "It's going well! I completed all my workouts this week.",
      timestamp: new Date(2024, 2, 24, 10, 35),
    },
    {
      id: 3,
      sender: "trainer",
      content: "Great job! I saw your workout logs. Keep up the good work!",
      timestamp: new Date(2024, 2, 24, 10, 40),
    },
  ],
  "2": [
    {
      id: 1,
      sender: "trainer",
      content: "Hi Jamie! How are you feeling after yesterday's session?",
      timestamp: new Date(2024, 2, 24, 9, 15),
    },
    {
      id: 2,
      sender: "trainee",
      content: "A bit sore, but in a good way! The new routine is challenging.",
      timestamp: new Date(2024, 2, 24, 9, 20),
    },
  ],
  "3": [],
}

export default function TrainerChatPage() {
  const [selectedTrainee, setSelectedTrainee] = useState<string>("")
  const [messages, setMessages] = useState(initialChats)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() && selectedTrainee) {
      const message = {
        id: Date.now(),
        sender: "trainer",
        content: newMessage,
        timestamp: new Date(),
      }

      setMessages({
        ...messages,
        [selectedTrainee]: [...(messages[selectedTrainee] || []), message],
      })
      setNewMessage("")
    }
  }

  const currentTrainee = trainees.find((trainee) => trainee.id === selectedTrainee)
  const currentMessages = selectedTrainee ? messages[selectedTrainee] || [] : []

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Chat with Trainees</h1>
        <p className="text-muted-foreground">Send messages and provide guidance to your trainees.</p>
      </div>

      <div className="mb-6">
        <Label htmlFor="trainee-select" className="text-base font-medium mb-2 block">
          Select a Trainee to Chat With
        </Label>
        <Select value={selectedTrainee} onValueChange={setSelectedTrainee}>
          <SelectTrigger id="trainee-select" className="w-full">
            <SelectValue placeholder="Select a trainee" />
          </SelectTrigger>
          <SelectContent>
            {trainees.map((trainee) => (
              <SelectItem key={trainee.id} value={trainee.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={trainee.avatar} alt={trainee.name} />
                    <AvatarFallback>{trainee.initials}</AvatarFallback>
                  </Avatar>
                  <span>{trainee.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTrainee ? (
        <Card className="h-[calc(100vh-16rem)]">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={currentTrainee?.avatar} alt={currentTrainee?.name} />
                <AvatarFallback>{currentTrainee?.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle>{currentTrainee?.name}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    Trainee
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Last active: Today, 10:30 AM</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-5rem)]">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {currentMessages.length > 0 ? (
                currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "trainer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "trainer" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "trainer" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Send className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No Messages Yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Start the conversation with {currentTrainee?.name}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-center p-6">
            <div className="rounded-full bg-muted p-3">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Select a Trainee</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a trainee from the dropdown above to start chatting
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-xs">
              {trainees.slice(0, 4).map((trainee) => (
                <Button
                  key={trainee.id}
                  variant="outline"
                  className="flex items-center gap-2 justify-start"
                  onClick={() => setSelectedTrainee(trainee.id)}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={trainee.avatar} alt={trainee.name} />
                    <AvatarFallback>{trainee.initials}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{trainee.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

