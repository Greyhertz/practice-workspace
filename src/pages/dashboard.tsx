import { useState } from "react";
import {
  BarChart3,
  Calculator,
  CheckSquare,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  Moon,
  Sun,
  Users,
  WalletCards,
} from "lucide-react";

import Expense from "./sub-pages/expense";
import Analytics from "./sub-pages/analytics";
import MiniCRM from "./sub-pages/mini-crm";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useUserStore } from "../store/useUserStore"; // Import the store
import Booking from "./sub-pages/booking";

const projects = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Your practice command center.",
    page: null,
  },
  {
    id: "expenses",
    label: "Expense Tracker",
    icon: WalletCards,
    description: "Practice forms, filtering, totals and local state.",
    page: <Expense />,
  },
  {
    id: "analytics",
    label: "Analytics Calculator",
    icon: BarChart3,
    description: "Practice reduce, grouping, KPIs and charts.",
    page: <Analytics />,
  },
  {
    id: "crm",
    label: "Mini CRM",
    icon: Users,
    description: "Practice CRUD, search, filters and customer data.",
    page: <MiniCRM />,
  },
  {
    id: "quotes",
    label: "Quote Builder",
    icon: Calculator,
    description: "Practice business calculations and nested data.",
    page: <Booking />,
  },
  {
    id: "tasks",
    label: "Task Manager",
    icon: CheckSquare,
    description: "Practice status changes and persistence.",
    page: <Booking />,
  },
   {
    id: "bookings",
    label: "Manage Bookings",
    icon: CheckSquare,
    description: "Practice status changes and persistence.",
    page: <Booking />,
  },
];

 function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const userName = useUserStore((state) => state.userName);
  const points = useUserStore((state) => state.points);

  const current = projects.find((p) => p.id === active) ?? projects[0];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="hidden w-64 border-r bg-card md:block">
            <div className="sticky top-0 flex h-screen flex-col">
              <div className="flex h-16 items-center gap-2 border-b px-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
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
                  const selected = active === project.id;
                  return (
                    <button
                      key={project.id}
                      onClick={() => setActive(project.id)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition ${
                        selected
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{project.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* <div className="border-t p-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setDark(!dark)}
                >
                  {dark ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  {dark ? "Light mode" : "Dark mode"}
                </Button>
              </div> */}

              <div className="border-b px-5 py-4 bg-muted/30">
                <p className="text-sm font-bold text-primary">{userName}</p>
                <p className="text-xs text-muted-foreground">
                  Exp: {points} points
                </p>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <header className="flex h-16 items-center justify-between border-b bg-card/50 backdrop-blur px-5 md:px-8">
              <div>
                <p className="text-xs text-muted-foreground">Practice Lab</p>
                <h1 className="text-sm font-semibold">{current.label}</h1>
              </div>
              <Button
                variant="outline"
                size="sm"
                className=""
                onClick={() => setDark(!dark)}
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </header>

            <div className="mx-auto max-w-6xl p-5 md:p-8">
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Current playground
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {current.label}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  {current.description}
                </p>
              </div>

              {/* RENDER LOGIC */}
              {active === "dashboard" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* NEW: ZUSTAND PRACTICE SECTION */}
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Global State Practice (Zustand)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                      <input
                        className="p-2 border rounded-md text-sm"
                        placeholder="Change your name..."
                        onChange={(e) =>
                          useUserStore.getState().updateName(e.target.value)
                        }
                      />
                      <Button
                        onClick={() => useUserStore.getState().addPoint()}
                      >
                        Earn 1 Point
                      </Button>
                    </CardContent>
                  </Card>

                  {/* ... your existing grid of project cards ... */}
            
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* This renders the actual component defined in the projects array */}
                  {current.page}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
