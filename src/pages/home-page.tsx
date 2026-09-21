import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const currentUser = useAuthStore((state) => state.currentUser?.email);
  const navigate = useNavigate();

  const firstLine = "Make your work simpler,";
  const secondLine = "clearer, and more productive.";

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

        <div className="pointer-events-none absolute left-1/2 top-32 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-900/10 blur-3xl" />

        <div className="mx-auto flex min-h-[680px] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
          {/* Badge */}
          <span className="mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Welcome to your workspace
          </span>

          {/* Hero Heading */}
          <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">
              {"Make your work simpler,".split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="hero-letter"
                  style={
                    {
                      "--delay": `${index * 0.08}s`,
                    } as React.CSSProperties
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>

            <span className="mt-2 block">
              {"clearer, and more productive.".split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="hero-letter"
                  style={
                    {
                      "--delay": `${(index + 22) * 0.08}s`,
                    } as React.CSSProperties
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Organize your work, understand what matters, and keep everything
            moving forward from one focused workspace.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="px-7"
              onClick={() => navigate("/dashboard")}
            >
              Open workspace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {!currentUser && (
              <Button
                size="lg"
                variant="outline"
                className="px-7"
                onClick={() => navigate("/sign-up")}
              >
                Create an account
              </Button>
            )}
          </div>

          {/* Product Preview */}
          <div className="relative mt-20 w-full max-w-5xl">
            {/* Outer ambient glow */}
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-purple-900/10 blur-3xl" />

            {/* Overview */}
            <Card className="hero-overview overflow-hidden rounded-2xl border-transparent bg-card/95 text-left shadow-2xl">
              {/* Preview Header */}
              <div className="flex h-12 items-center justify-between border-b bg-muted/20 px-5">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-5 w-5 object-contain"
                  />

                  <span className="text-xs font-semibold">
                    Workspace Overview
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                </div>
              </div>

              {/* Preview Content */}
              <CardContent className="p-5 sm:p-7">
                {/* Metrics */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Revenue",
                      value: "₦4.82M",
                      change: "+14.2%",
                    },
                    {
                      label: "Expenses",
                      value: "₦1.64M",
                      change: "-6.8%",
                    },
                    {
                      label: "Active Clients",
                      value: "128",
                      change: "+12",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border bg-background p-4"
                    >
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>

                      <div className="mt-2 flex items-end justify-between gap-2">
                        <p className="text-xl font-semibold tracking-tight">
                          {item.value}
                        </p>

                        <span className="text-[10px] font-medium text-muted-foreground">
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lower Dashboard */}
                <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                  {/* Performance */}
                  <div className="rounded-xl border bg-background p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold">Performance</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Business activity over the last 30 days
                        </p>
                      </div>

                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="mt-8 flex h-28 items-end gap-2">
                      {[35, 48, 42, 65, 54, 72, 61, 84, 68, 92, 76, 88].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-sm bg-purple-900/20 transition-all duration-500 hover:bg-purple-800/40"
                            style={{ height: `${height}%` }}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  {/* Things to Review */}
                  <div className="rounded-xl border bg-background p-5">
                    <p className="text-sm font-semibold">Things to review</p>

                    <div className="mt-5 space-y-4">
                      {[
                        "3 client follow-ups",
                        "2 pending quotations",
                        "Expense increased this week",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />

                          <span className="text-xs text-muted-foreground">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A workspace built around getting things done.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Keep the important parts of your work connected without constantly
              switching between different tools.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BarChart3,
                title: "Analytics",
                description:
                  "Understand performance and see the numbers that matter.",
              },
              {
                icon: Users,
                title: "Clients",
                description:
                  "Keep customer information organized and accessible.",
              },
              {
                icon: FileText,
                title: "Quotations",
                description:
                  "Create and manage professional quotations quickly.",
              },
              {
                icon: WalletCards,
                title: "Expenses",
                description:
                  "Track spending and maintain a clearer view of costs.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="border-border/60 bg-background"
                >
                  <CardContent className="p-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/50">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="mt-5 text-sm font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/50">
            <Sparkles className="h-4 w-4" />
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to get more organized?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Bring your work together and start building a clearer, more focused
            workflow.
          </p>

          <Button
            size="lg"
            className="mt-8 px-7"
            onClick={() => navigate(currentUser ? "/dashboard" : "/sign-up")}
          >
            {currentUser ? "Open dashboard" : "Get started"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-5 w-5 object-contain"
            />

            <span className="text-xs font-medium">Practice Workspace</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Built to keep work simple and focused.
          </p>
        </div>
      </footer>
    </main>
  );
};
