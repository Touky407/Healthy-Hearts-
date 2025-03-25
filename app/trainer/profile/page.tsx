"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TrainerProfilePage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State for user profile data
  const [profileData, setProfileData] = useState({
    name: "John Smith", // Default values for demonstration
    age: "32",
    specialization: "Strength & Conditioning",
    experience: "8", // years
    bio: "Certified personal trainer with 8 years of experience specializing in strength and conditioning. Passionate about helping clients achieve their fitness goals through personalized training programs.",
  })

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="container p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your professional information</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>Update your trainer details</CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={profileData.specialization}
                  onChange={handleInputChange}
                  placeholder="Your area of expertise"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  value={profileData.experience}
                  onChange={handleInputChange}
                  placeholder="Years of professional experience"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Write a short bio about yourself"
                  rows={4}
                />
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
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload or update your profile picture</CardDescription>
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
                <p className="text-sm font-medium">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Your profile is visible to all trainees. A professional profile picture helps build trust with your
                  clients.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

