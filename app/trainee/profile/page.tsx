"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, User, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

// Mock data for weight history
const weightHistoryData = [
  { date: "Jan", weight: 78 },
  { date: "Feb", weight: 77 },
  { date: "Mar", weight: 76 },
  { date: "Apr", weight: 75.5 },
  { date: "May", weight: 75 },
  { date: "Jun", weight: 74 },
  { date: "Jul", weight: 75 },
]

export default function ProfilePage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State for user profile data
  const [profileData, setProfileData] = useState({
    name: "John Doe", // Default values for demonstration
    age: "28",
    weight: "75", // in kg
    height: "180", // in cm
    goalWeight: "70", // target weight in kg
  })

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the profile data to a database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-primary">{`Weight: ${payload[0].value} kg`}</p>
        </div>
      )
    }
    return null
  }

  // Calculate progress percentage towards goal
  const calculateProgressPercentage = () => {
    const currentWeight = Number(profileData.weight)
    const goalWeight = Number(profileData.goalWeight)
    const startWeight = weightHistoryData[0].weight // Initial weight from history

    // If goal is to lose weight
    if (currentWeight > goalWeight) {
      const totalToLose = startWeight - goalWeight
      const lost = startWeight - currentWeight
      return Math.min(Math.round((lost / totalToLose) * 100), 100)
    }
    // If goal is to gain weight
    else if (currentWeight < goalWeight) {
      const totalToGain = goalWeight - startWeight
      const gained = currentWeight - startWeight
      return Math.min(Math.round((gained / totalToGain) * 100), 100)
    }

    // If current weight equals goal weight
    return 100
  }

  const progressPercentage = calculateProgressPercentage()
  const remainingWeight = Math.abs(Number(profileData.weight) - Number(profileData.goalWeight))
  const isWeightLossGoal = Number(profileData.weight) > Number(profileData.goalWeight)

  return (
    <div className="container p-4 md:p-6 mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Personal Information</CardTitle>
            <CardDescription className="text-center">Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={profileData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={profileData.weight}
                    onChange={handleInputChange}
                    placeholder="Weight in kg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={profileData.height}
                    onChange={handleInputChange}
                    placeholder="Height in cm"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Profile Picture</CardTitle>
            <CardDescription className="text-center">Upload or update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="relative cursor-pointer group" onClick={handleProfilePictureClick}>
              <Avatar className="h-32 w-32">
                <AvatarImage src={profilePicture || ""} alt="Profile picture" />
                <AvatarFallback className="text-4xl">
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>

              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>

              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Click on the avatar to upload a new profile picture
            </p>

            <div className="w-full pt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-center">Profile Stats</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-md bg-muted p-2">
                    <p className="text-muted-foreground">BMI</p>
                    <p className="font-medium">
                      {profileData.weight && profileData.height
                        ? (Number(profileData.weight) / (Number(profileData.height) / 100) ** 2).toFixed(1)
                        : "-"}
                    </p>
                  </div>
                  <div className="rounded-md bg-muted p-2">
                    <p className="text-muted-foreground">Ideal Weight</p>
                    <p className="font-medium">
                      {profileData.height ? (22.5 * (Number(profileData.height) / 100) ** 2).toFixed(1) + " kg" : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Goal Setting</CardTitle>
            <CardDescription className="text-center">Set and track your weight goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                  <p className="text-sm text-muted-foreground">Set your target weight</p>
                </div>
                <div className="w-24">
                  <Input
                    id="goalWeight"
                    name="goalWeight"
                    type="number"
                    value={profileData.goalWeight}
                    onChange={handleInputChange}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current: {profileData.weight} kg</span>
                  <span>Goal: {profileData.goalWeight} kg</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-sm">
                    <Target className="h-4 w-4 text-primary" />
                    <span>{progressPercentage}% Complete</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {remainingWeight.toFixed(1)} kg to {isWeightLossGoal ? "lose" : "gain"}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Goal Timeline</Label>
              <div className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Recommended Rate</p>
                  <p className="text-xs text-muted-foreground">{isWeightLossGoal ? "Lose" : "Gain"} 0.5 kg per week</p>
                </div>
                <div className="text-sm font-medium">{Math.ceil(remainingWeight / 0.5)} weeks</div>
              </div>
            </div>

            <Button className="w-full">Update Goal</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Weight Progress</CardTitle>
            <CardDescription className="text-center">Track your weight changes over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weightHistoryData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis
                    domain={["dataMin - 2", "dataMax + 2"]}
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Weight (kg)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">Add Weight Entry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

