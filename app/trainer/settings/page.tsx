"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TrainerSettingsPage() {
  const { toast } = useToast()

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newTraineeAlerts: true,
    mealUploads: true,
    workoutUploads: true,
    traineeMessages: true,
  })

  // State for app preferences
  const [preferences, setPreferences] = useState({
    theme: "light",
    availabilityStatus: "available",
    language: "english",
  })

  const handleSwitchChange = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings],
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setPreferences({
      ...preferences,
      [name]: value,
    })
  }

  const handleSaveSettings = () => {
    // Here you would typically save the settings to a database
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your app preferences and notifications</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => handleSwitchChange("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <Switch
                id="push-notifications"
                checked={notificationSettings.pushNotifications}
                onCheckedChange={() => handleSwitchChange("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-trainee-alerts">New Trainee Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when a new trainee signs up</p>
              </div>
              <Switch
                id="new-trainee-alerts"
                checked={notificationSettings.newTraineeAlerts}
                onCheckedChange={() => handleSwitchChange("newTraineeAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="meal-uploads">Meal Uploads</Label>
                <p className="text-sm text-muted-foreground">Get notified when trainees upload meals</p>
              </div>
              <Switch
                id="meal-uploads"
                checked={notificationSettings.mealUploads}
                onCheckedChange={() => handleSwitchChange("mealUploads")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="workout-uploads">Workout Uploads</Label>
                <p className="text-sm text-muted-foreground">Get notified when trainees log workouts</p>
              </div>
              <Switch
                id="workout-uploads"
                checked={notificationSettings.workoutUploads}
                onCheckedChange={() => handleSwitchChange("workoutUploads")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="trainee-messages">Trainee Messages</Label>
                <p className="text-sm text-muted-foreground">Get notified when trainees send messages</p>
              </div>
              <Switch
                id="trainee-messages"
                checked={notificationSettings.traineeMessages}
                onCheckedChange={() => handleSwitchChange("traineeMessages")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={preferences.theme} onValueChange={(value) => handleSelectChange("theme", value)}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability-status">Availability Status</Label>
              <Select
                value={preferences.availabilityStatus}
                onValueChange={(value) => handleSelectChange("availabilityStatus", value)}
              >
                <SelectTrigger id="availability-status">
                  <SelectValue placeholder="Select availability status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={preferences.language} onValueChange={(value) => handleSelectChange("language", value)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button onClick={handleSaveSettings} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Privacy & Business Settings</CardTitle>
            <CardDescription>Manage your data and business preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-sharing">Data Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous usage data to be shared for app improvement
                </p>
              </div>
              <Switch id="data-sharing" checked={true} onCheckedChange={() => {}} />
            </div>

            <div className="space-y-0.5 pt-4">
              <Label htmlFor="public-profile">Public Profile</Label>
              <p className="text-sm text-muted-foreground">Make your trainer profile visible to potential trainees</p>
              <Switch id="public-profile" checked={true} onCheckedChange={() => {}} className="mt-2" />
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <Button variant="outline" className="flex-1">
                Download Business Data
              </Button>
              <Button variant="destructive" className="flex-1">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

