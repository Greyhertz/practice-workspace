import {
  BarChart3,
  CheckSquare,
  ChevronRight,
  WalletCards,
  Users,
  Calculator,
  Book,
  Activity,
} from "lucide-react";

import { Link, Outlet, useLocation } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Navbar } from "@/components/dashboard/navbar";

import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

const projects = [
  {
    id: "expenses",
    label: "Expense Tracker",
    icon: WalletCards,
    description: "Practice forms, filtering, totals and local state.",
    path: "/dashboard/expenses",
  },
  {
    id: "analytics",
    label: "Analytics Calculator",
    icon: BarChart3,
    description: "Practice reduce, grouping, KPIs and charts.",
    path: "/dashboard/analytics",
  },
  {
    id: "crm",
    label: "Mini CRM",
    icon: Users,
    description: "Practice CRUD, search, filters and customer data.",
    path: "/dashboard/clients",
  },
  {
    id: "quotes",
    label: "Quote Builder",
    icon: Calculator,
    description: "Practice business calculations and nested data.",
    path: "/dashboard/quote",
  },
  {
    id: "tasks",
    label: "Task Manager",
    icon: CheckSquare,
    description: "Practice status changes and persistence.",
    path: "/dashboard/task-manager",
  },
  {
    id: "bookings",
    label: "Manage Bookings",
    icon: Book,
    description: "Practice status changes and persistence.",
    path: "/dashboard/bookings",
  },
  {
    id: "activity",
    label: "Activity",
    icon: Activity,
    description: "Practice activity feeds and event history.",
    path: "/dashboard/activity-logs",
  },
];

export default function Dashboard() {
  const location = useLocation();

  const currentUser = useAuthStore((state) => state.currentUser);

  const firstName = currentUser?.name?.trim().split(/\s+/)[0] || "there";

  const points = useUserStore((state) => {
    const email = currentUser?.email;

    if (!email) return 0;

    return state.pointsByUser?.[email] || 0;
  });

  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Navbar />

        <div className="flex min-h-[calc(100vh-4rem)] flex-col">
          {/* Mobile / sidebar trigger */}
          <div className="flex items-center px-4 py-2 md:hidden">
            <SidebarTrigger />
          </div>

          <main className="flex-1">
            <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
              {isDashboardHome ? (
                <>
                  {/* Page heading */}
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      Welcome back, {firstName}
                    </p>

                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                      Dashboard
                    </h1>

                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                      Your personal workspace for practicing real-world business
                      applications.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-muted-foreground">
                          Total projects
                        </p>

                        <p className="mt-2 text-2xl font-semibold">
                          {projects.length}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Across your workspace
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-muted-foreground">
                          Points earned
                        </p>

                        <p className="mt-2 text-2xl font-semibold">{points}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Keep learning
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-muted-foreground">
                          Active workspace
                        </p>

                        <p className="mt-2 truncate text-xl font-semibold">
                          Practice Lab
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Your personal sandbox
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-5">
                        <p className="text-xs font-medium text-muted-foreground">
                          Completion rate
                        </p>

                        <p className="mt-2 text-2xl font-semibold">78%</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Up 12% this week
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main dashboard */}
                  <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                    {/* Activity */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                          <CardTitle className="text-base">
                            Workspace activity
                          </CardTitle>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Your practice progress this week
                          </p>
                        </div>

                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>

                      <CardContent>
                        <div className="flex h-44 items-end gap-3 border-b px-2">
                          {[35, 58, 42, 76, 64, 88, 52].map((height, index) => (
                            <div
                              key={index}
                              className="flex flex-1 flex-col items-center gap-2"
                            >
                              <div
                                className="w-full rounded-t-md bg-primary/80"
                                style={{
                                  height: `${height}%`,
                                }}
                              />

                              <span className="text-[10px] text-muted-foreground">
                                {
                                  [
                                    "Mon",
                                    "Tue",
                                    "Wed",
                                    "Thu",
                                    "Fri",
                                    "Sat",
                                    "Sun",
                                  ][index]
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Quick actions
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="rounded-lg border bg-muted/30 p-3">
                          <p className="text-sm font-medium">
                            Update your profile
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Keep your workspace details current.
                          </p>
                        </div>

                        <Input
                          className="text-sm"
                          placeholder="Change your name..."
                          value={currentUser?.name || ""}
                          onChange={(e) =>
                            useUserStore.getState().updateName(e.target.value)
                          }
                        />

                        <Button
                          className="w-full"
                          onClick={() => useUserStore.getState().addPoint(1)}
                        >
                          Earn 1 point
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Projects */}
                  <div className="mt-5">
                    <div className="mb-4">
                      <h2 className="text-base font-semibold">
                        Practice projects
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Choose a project to continue building.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => {
                        const Icon = project.icon;

                        return (
                          <Link key={project.id} to={project.path}>
                            <Card className="group h-full transition-colors hover:border-primary/40">
                              <CardHeader className="pb-3">
                                <div className="mb-3 flex items-center justify-between">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="h-4 w-4" />
                                  </div>

                                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>

                                <CardTitle className="text-sm font-semibold">
                                  {project.label}
                                </CardTitle>
                              </CardHeader>

                              <CardContent className="pt-0">
                                <p className="text-xs leading-5 text-muted-foreground">
                                  {project.description}
                                </p>

                                <div className="mt-4 border-t pt-3 text-xs font-medium text-muted-foreground group-hover:text-foreground">
                                  Open project →
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Outlet />
                </div>
              )}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
