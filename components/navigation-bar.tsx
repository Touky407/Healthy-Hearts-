"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Dumbbell, Home, LogOut, MessageSquare, Settings, User, Utensils, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationBarProps {
  userRole: "trainee" | "trainer"
}

export function NavigationBar({ userRole }: NavigationBarProps) {
  const pathname = usePathname()
  const basePath = `/${userRole}`

  const links = [
    {
      name: "Dashboard",
      href: `${basePath}/dashboard`,
      icon: Home,
    },
    {
      name: "Meals",
      href: userRole === "trainee" ? `${basePath}/meals` : `${basePath}/review-meals`,
      icon: Utensils,
    },
    {
      name: "Workouts",
      href: userRole === "trainee" ? `${basePath}/workouts` : `${basePath}/review-workouts`,
      icon: Dumbbell,
    },
    {
      name: userRole === "trainee" ? "Classes" : "Schedule",
      href: userRole === "trainee" ? `${basePath}/classes` : `${basePath}/schedule`,
      icon: Users,
    },
    {
      name: "Calendar",
      href: `${basePath}/calendar`,
      icon: Calendar,
    },
    {
      name: "Chat",
      href: `${basePath}/chat`,
      icon: MessageSquare,
    },
  ]

  const accountLinks = [
    {
      name: "Profile",
      href: `/${userRole}/profile`,
      icon: User,
    },
    {
      name: "Settings",
      href: `/${userRole}/settings`,
      icon: Settings,
    },
    {
      name: "Logout",
      href: "/login",
      icon: LogOut,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:fixed md:top-0 md:h-screen md:w-64 md:border-r md:border-t-0 flex md:flex-col">
      {/* Main navigation links */}
      <div className="grid h-16 grid-cols-6 w-full md:h-auto md:grid-cols-1 md:flex-col md:space-y-2 md:p-4 md:flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 p-1 text-xs transition-colors hover:text-primary md:flex-row md:justify-start md:gap-4 md:px-3 md:py-2 md:text-sm",
              pathname === link.href ? "text-primary font-medium" : "text-muted-foreground",
            )}
          >
            <link.icon className="h-5 w-5 md:h-5 md:w-5" />
            <span className="md:font-medium">{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Account links - hidden on mobile, shown at bottom of sidebar on desktop */}
      <div className="hidden md:block md:border-t md:p-4 md:mt-auto">
        {accountLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-4 px-3 py-2 text-sm transition-colors hover:text-primary mb-1",
              pathname === link.href ? "text-primary font-medium" : "text-muted-foreground",
              link.name === "Logout" ? "text-red-500 hover:text-red-600" : "",
            )}
          >
            <link.icon className="h-5 w-5" />
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </div>

      {/* Mobile account links - shown as additional icons in the bottom nav */}
      <div className="fixed bottom-16 left-0 w-full border-t bg-background md:hidden">
        <div className="grid grid-cols-3 h-12">
          {accountLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-1 text-xs transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-medium" : "text-muted-foreground",
                link.name === "Logout" ? "text-red-500 hover:text-red-600" : "",
              )}
            >
              <link.icon className="h-4 w-4" />
              <span className="text-[10px]">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

