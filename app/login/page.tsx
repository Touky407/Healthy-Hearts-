"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, KeyRound } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userRole, setUserRole] = useState<"trainee" | "trainer">("trainee")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Check for demo credentials
    if (email === "master" && password === "master") {
      router.push(`/${userRole}/dashboard`)
      return
    }

    // In a real app, you would validate credentials here
    // For now, we'll just redirect based on the selected role
    router.push(`/${userRole}/dashboard`)
  }

  const handleDemoLogin = () => {
    setEmail("master")
    setPassword("master")
    // You could automatically submit the form here if desired
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">HealthyHearts</h1>
          <p className="text-sm text-muted-foreground">Connect with your trainer and track your fitness journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-muted">
              <KeyRound className="h-4 w-4" />
              <AlertDescription>
                <button onClick={handleDemoLogin} className="text-primary hover:underline cursor-pointer">
                  Use demo login: master / master
                </button>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Tabs
                defaultValue="trainee"
                className="w-full"
                onValueChange={(value) => setUserRole(value as "trainee" | "trainer")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="trainee">Trainee</TabsTrigger>
                  <TabsTrigger value="trainer">Trainer</TabsTrigger>
                </TabsList>
              </Tabs>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

