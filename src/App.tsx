import { useState } from "react"
import {
  BarChart3,
  Calculator,
  CheckSquare,
  ChevronRight,
  CircleDollarSign,
  ContactRound,
  LayoutDashboard,
  Moon,
  Settings,
  Sun,
  Users,
  WalletCards,
} from "lucide-react"
import { Button } from "./components/ui/button"
// import {Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
const projects = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Your practice command center." },
  { id: "expenses", label: "Expense Tracker", icon: WalletCards, description: "Practice forms, filtering, totals and local state." },
  { id: "analytics", label: "Analytics Calculator", icon: BarChart3, description: "Practice reduce, grouping, KPIs and charts." },
  { id: "crm", label: "Mini CRM", icon: Users, description: "Practice CRUD, search, filters and customer data." },
  { id: "quotes", label: "Quote Builder", icon: Calculator, description: "Practice business calculations and nested data." },
  { id: "tasks", label: "Task Manager", icon: CheckSquare, description: "Practice status changes and persistence." },
  { id: "customers", label: "Customer Data", icon: ContactRound, description: "Practice data transformation and tables." },
  { id: "settings", label: "Settings", icon: Settings, description: "Practice preferences, forms and configuration." },
]

export default function App() {
  const [active, setActive] = useState("dashboard")
  const [dark, setDark] = useState(false)

  const current = projects.find((p) => p.id === active) ?? projects[0]

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 border-r bg-card md:block">
            <div className="sticky top-0 flex h-screen flex-col">
              <div className="flex h-16 items-center gap-2 border-b px-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                  <CircleDollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Practice Workspace</p>
                  <p className="text-xs text-muted-foreground">Build. Break. Learn.</p>
                </div>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {projects.map((project) => {
                  const Icon = project.icon
                  const selected = active === project.id
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
                  )
                })}
              </nav>

              <div className="border-t p-3">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setDark(!dark)}>
                  {dark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {dark ? "Light mode" : "Dark mode"}
                </Button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <header className="flex h-16 items-center justify-between border-b px-5 md:px-8">
              <div>
                <p className="text-xs text-muted-foreground">Practice Lab</p>
                <h1 className="text-sm font-semibold">{current.label}</h1>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDark(!dark)}>
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">Theme</span>
              </Button>
            </header>

            <div className="mx-auto max-w-6xl p-5 md:p-8">
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium text-muted-foreground">Current playground</p>
                <h2 className="text-2xl font-semibold tracking-tight">{current.label}</h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{current.description}</p>
              </div>

              {active === "dashboard" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {projects.slice(1).map((project) => {
                    const Icon = project.icon
                    return (
                      <Card key={project.id} className="cursor-pointer transition hover:-translate-y-0.5 hover:shadow-sm" onClick={() => setActive(project.id)}>
                        <CardHeader>
                          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md border">
                            <Icon className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-base">{project.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="mt-4 flex items-center text-xs font-medium">
                            Open playground <ChevronRight className="ml-1 h-3 w-3" />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Start building here</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <p className="text-sm font-medium">This playground is intentionally empty.</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Build the feature yourself. Don't copy a finished implementation.
                      </p>
                      <p className="mt-4 text-xs text-muted-foreground">
                        Tip: start by defining the data shape, then the UI, then the state and business logic.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}