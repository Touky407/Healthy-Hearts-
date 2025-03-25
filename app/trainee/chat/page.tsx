"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "trainer",
    content: "Hi there! How's your training going?",
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
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "trainee",
        content: newMessage,
        timestamp: new Date(),
      }

      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Chat with Trainer</h1>
        <p className="text-muted-foreground">Send messages and notes to your trainer.</p>
      </div>

      <Card className="h-[calc(100vh-12rem)]">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Trainer" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <CardTitle>John Doe</CardTitle>
                <Badge variant="outline" className="ml-2">
                  Trainer
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Last active: Today, 11:45 AM</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100%-5rem)]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "trainee" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "trainee" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "trainee" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
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
    </div>
  )
}

