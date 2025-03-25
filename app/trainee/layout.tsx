import type React from "react"
import { NavigationBar } from "@/components/navigation-bar"

export default function TraineeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row with-sidebar">
      <div className="md:w-64 md:flex-shrink-0">
        <NavigationBar userRole="trainee" />
      </div>
      <main className="flex-1 pb-20 md:pb-0 w-full">{children}</main>
    </div>
  )
}

