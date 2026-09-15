import { useState, useEffect } from "react";
import {
  Activity,
  BarChart3,
  Book,
  Calculator,
  CheckSquare,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Users,
  WalletCards,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

// Sub-pages
import Expense from "@/pages/sub-pages/expense";
import Analytics from "@/pages/sub-pages/analytics";
import Booking from "@/pages/sub-pages/booking";
import MiniCRM from "@/pages/sub-pages/mini-crm";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "../button";
import { Card, CardHeader, CardTitle, CardContent } from "../card";
import TaskManager from "@/pages/sub-pages/task-manger";
import { useAuthStore } from "@/store/useAuthStore";

const projects = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Your practice command center.",
    path: "/dashboard",
    component: null,
  },
  {
    id: "expenses",
    label: "Expense Tracker",
    icon: WalletCards,
    description: "Practice forms, filtering, totals and local state.",
    path: "/dashboard/expenses",
    component: <Expense />,
  },
  {
    id: "analytics",
    label: "Analytics Calculator",
    icon: BarChart3,
    description: "Practice reduce, grouping, KPIs and charts.",
    path: "/dashboard/analytics",
    component: <Analytics />,
  },
  {
    id: "crm",
    label: "Mini CRM",
    icon: Users,
    description: "Practice CRUD, search, filters and customer data.",
    path: "/dashboard/clients",
    component: <MiniCRM />,
  },
  {
    id: "quotes",
    label: "Quote Builder",
    icon: Calculator,
    description: "Practice business calculations and nested data.",
    path: "/dashboard/quote",
    component: <Booking />,
  },
  {
    id: "tasks",
    label: "Task Manager",
    icon: CheckSquare,
    description: "Practice status changes and persistence.",
    path: "/dashboard/task-manager",
    component: <TaskManager />,
  },
  {
    id: "bookings",
    label: "Manage Bookings",
    icon: Book,
    description: "Practice status changes and persistence.",
    path: "/dashboard/bookings",
    component: <Booking />,
  },
  {
    id: "Feeds",
    label: "Feeds",
    icon: Activity,
    description: "Practice status changes and persistence.",
    path: "/dashboard/activity-logs",
    component: <Booking />,
  },
];

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const userName = useUserStore((state) => state.userName);
  const currentUser = useAuthStore((state) => state.currentUser);
  const points = useUserStore((state) => {
    // 1. Get the current user's email
    currentUser ? (state.pointsByUser[currentUser.email] ?? 0) : 0;
    const userEmail = currentUser?.email;

    if (!userEmail) return 0; // Default to 0 XP if no one is logged in

    // 2. Look up this user's specific points from the new map structure
    // (Falling back to 0 XP if this user doesn't have a record yet)
    return state.pointsByUser?.[userEmail] || 0;
  });
  
  const logout = useAuthStore((state) => state.logout);

  // LOGIC FIX 1: Find the current project based on path hierarchy.
  // We reverse the check so more specific paths (like /dashboard/clients)
  // are found before the general /dashboard path.
  const current =
    [...projects]
      .reverse()
      .find(
        (p) => p.id !== "dashboard" && location.pathname.startsWith(p.path),
      ) || projects[0];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden w-64 border-r bg-background md:block">
            <div className="sticky top-0 flex h-screen flex-col">
              <div className="flex h-16 items-center gap-2 border-b px-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CircleDollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Practice Workspace</p>
                  <p className="text-xs text-muted-foreground">
                    Build. Break. Learn.
                  </p>
                </div>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {projects.map((project) => {
                  const Icon = project.icon;

                  // LOGIC FIX 2: Ensure sidebar stays highlighted for sub-pages
                  const isSelected =
                    project.id === "dashboard"
                      ? location.pathname === "/dashboard"
                      : location.pathname.startsWith(project.path);

                  return (
                    <Link
                      key={project.id}
                      to={project.path}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "text-muted-primary hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{project.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t px-5 py-4 bg-muted/30">
                <p className="text-sm font-bold text-primary truncate">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Exp: {points} points
                </p>
              </div>

              <div className="p-3 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setDark(!dark)}
                >
                  {dark ? (
                    <Sun className="mr-2 h-4 w-4 text-yellow-500" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  {dark ? "Light mode" : "Dark mode"}
                </Button>
              </div>
            </div>
          </aside>

          <main className="flex-1 flex flex-col">
            <header className="flex h-16 items-center justify-between border-b bg-card/50 backdrop-blur px-5 md:px-8 sticky top-0 ">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                  Practice Lab
                </p>
                <h1 className="text-sm font-semibold">{current?.label}</h1>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="flex gap-3 p-2 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">
                      {currentUser?.name || "Guest"}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-red-600 hover:bg-red-50"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDark(!dark)}
                >
                  {dark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </header>

            <div className="mx-auto w-full max-w-6xl p-5 md:p-8">
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-muted-foreground text-blue-600">
                  Current playground
                </p>
                <h2 className="text-3xl font-bold tracking-tight">
                  {current?.label}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {current?.description}
                </p>
              </div>

              {/* RENDER LOGIC */}
              {location.pathname === "/dashboard" ? (
                <div className="space-y-6">
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Global State Practice (Zustand)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-4">
                      <input
                        className="p-2 border rounded-md text-sm bg-background"
                        placeholder="Change your name..."
                        value={userName}
                        onChange={(e) =>
                          useUserStore.getState().updateName(e.target.value)
                        }
                      />
                      <Button
                        variant="default"
                        // LOGIC FIX 3: Added () to call the function
                        onClick={() => useUserStore.getState().addPoint(1)}
                      >
                        Earn 1 Point
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.slice(1).map((project) => {
                      const Icon = project.icon;
                      return (
                        <Link key={project.id} to={project.path}>
                          <Card className="h-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md active:scale-95">
                            <CardHeader>
                              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md border bg-muted/50">
                                <Icon className="h-4 w-4" />
                              </div>
                              <CardTitle className="text-base">
                                {project.label}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                {project.description}
                              </p>
                              <div className="mt-4 flex items-center text-xs font-medium text-blue-600">
                                Open playground{" "}
                                <ChevronRight className="ml-1 h-3 w-3" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Outlet />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
