import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BellPlus, Calendar, Dumbbell, Utensils, Users } from "lucide-react"

export default function TrainerDashboard() {
  return (
    <div className="container p-4 md:p-6 mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Trainer Dashboard</h1>
        <p className="text-muted-foreground">Manage your trainees and classes.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trainees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">0</div>
            <p className="text-xs text-muted-foreground text-center">active trainees</p>
            <div className="mt-4">
              <Button size="sm" className="w-full">
                Manage Trainees
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Reviews</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">0</div>
            <p className="text-xs text-muted-foreground text-center">pending reviews</p>
            <div className="mt-4">
              <Link href="/trainer/review-meals">
                <Button size="sm" className="w-full">
                  Review Meals
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workout Reviews</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">0</div>
            <p className="text-xs text-muted-foreground text-center">pending reviews</p>
            <div className="mt-4">
              <Link href="/trainer/review-workouts">
                <Button size="sm" className="w-full">
                  Review Workouts
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Class Schedule</CardTitle>
            <CardDescription className="text-center">Manage your classes and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No upcoming classes</p>
                <div className="flex gap-2 mt-2">
                  <Link href="/trainer/schedule">
                    <Button variant="outline" size="sm">
                      View Schedule
                    </Button>
                  </Link>
                  <Link href="/trainer/schedule/new">
                    <Button size="sm">Create Class</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Notifications</CardTitle>
            <CardDescription className="text-center">Send updates to your trainees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-md border-2 border-dashed">
              <div className="flex flex-col items-center gap-1 text-center">
                <BellPlus className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No recent notifications</p>
                <Link href="/trainer/notifications">
                  <Button size="sm" className="mt-2">
                    Create Notification
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

