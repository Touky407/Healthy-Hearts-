"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, BellPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotificationsPage() {
  const router = useRouter()
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [hasExpiry, setHasExpiry] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    audience: "all",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the notification data
    console.log({ ...formData, expiryDate: hasExpiry ? expiryDate : null })

    // Redirect back to the dashboard
    router.push("/trainer/dashboard")
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Post Notification</h1>
        <p className="text-muted-foreground">Send updates and announcements to your trainees.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Gym Closure Notice"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body of Notification</Label>
              <Textarea
                id="body"
                name="body"
                placeholder="Enter the notification message..."
                value={formData.body}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select value={formData.audience} onValueChange={(value) => handleSelectChange("audience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trainees</SelectItem>
                  <SelectItem value="active">Active Trainees Only</SelectItem>
                  <SelectItem value="class-members">Class Members Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="expiry" checked={hasExpiry} onCheckedChange={setHasExpiry} />
                <Label htmlFor="expiry">Set Expiry Date</Label>
              </div>

              {hasExpiry && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expiryDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : <span>Select expiry date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => router.push("/trainer/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={!formData.title || !formData.body}>
                <BellPlus className="mr-2 h-4 w-4" /> Send Notification
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

