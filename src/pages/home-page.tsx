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
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1] as const;

/* =================================
   ANIMATED BORDER
================================= */

const AnimatedBorder = ({
  children,
  className = "",
  radius = "rounded-2xl",
  intensity = "normal",
}: {
  children: React.ReactNode;
  className?: string;
  radius?: string;
  intensity?: "normal" | "strong";
}) => {
  return (
    <div
      className={`relative ${radius} ${className}`}
    >
      {/* Rotating energy layer */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-[1px] ${radius} overflow-hidden`}
        style={{
          background:
            intensity === "strong"
              ? "conic-gradient(from 0deg, transparent 0deg, transparent 45deg, rgba(76,29,149,0.12) 70deg, rgba(124,58,237,0.95) 105deg, rgba(168,85,247,1) 125deg, rgba(124,58,237,0.35) 155deg, transparent 200deg, transparent 360deg)"
              : "conic-gradient(from 0deg, transparent 0deg, transparent 50deg, rgba(76,29,149,0.08) 75deg, rgba(124,58,237,0.65) 110deg, rgba(168,85,247,0.75) 130deg, rgba(124,58,237,0.2) 160deg, transparent 205deg, transparent 360deg)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: intensity === "strong" ? 7 : 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Soft ambient glow */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-5 -z-10 ${radius} bg-purple-700/10 blur-2xl`}
        animate={{
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Actual content */}
      <div className={`relative ${radius}`}>{children}</div>
    </div>
  );
};


/* =================================
   PAGE ANIMATIONS
================================= */

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};


/* =================================
   HOME PAGE
================================= */

export const HomePage = () => {
  const currentUser = useAuthStore((state) => state.currentUser?.email);
  const navigate = useNavigate();

  const firstLine = "Make your work simpler,";
  const secondLine = "clearer, and more productive.";

  const features = [
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
  ];

  const metrics = [
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
  ];

  const reviewItems = [
    "3 client follow-ups",
    "2 pending quotations",
    "Expense increased this week",
  ];

  const chartValues = [
    35,
    48,
    42,
    65,
    54,
    72,
    61,
    84,
    68,
    92,
    76,
    88,
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* =================================
          HERO
      ================================= */}

      <section className="relative isolate overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-primary/10 via-background to-background" />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-900/10 blur-[120px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small floating particles */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[12%] top-40 h-1 w-1 rounded-full bg-purple-400/50"
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[14%] top-64 h-1.5 w-1.5 rounded-full bg-purple-400/40"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="mx-auto flex min-h-[680px] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              whileHover={{
                scale: 1.04,
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Welcome to your workspace
            </motion.span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block">
              {firstLine.split("").map((char, index) => (
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
              {secondLine.split("").map((char, index) => (
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
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            Organize your work, understand what matters, and keep everything
            moving forward from one focused workspace.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="group px-7"
              onClick={() => navigate("/dashboard")}
            >
              Open workspace

              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
          </motion.div>

          {/* =================================
              PRODUCT PREVIEW
          ================================= */}

          <motion.div
            variants={fadeScale}
            className="relative mt-20 w-full max-w-5xl"
          >
            <AnimatedBorder
              radius="rounded-2xl"
              intensity="strong"
              className="hero-overview"
            >
              <Card className="overflow-hidden rounded-2xl border-transparent bg-card/95 text-left shadow-2xl backdrop-blur-xl">
                {/* Preview Header */}
                <div className="flex h-12 items-center justify-between border-b bg-muted/20 px-5">
                  <div className="flex items-center gap-2">
                    <motion.img
                      src="/logo.png"
                      alt="Logo"
                      className="h-5 w-5 object-contain"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      }}
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
                    {metrics.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.4,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease,
                        }}
                        whileHover={{
                          y: -4,
                        }}
                        className="rounded-xl border bg-background p-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-900/5"
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
                      </motion.div>
                    ))}
                  </div>

                  {/* Lower Dashboard */}
                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                    {/* Performance */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.7,
                        ease,
                      }}
                      className="rounded-xl border bg-background p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold">
                            Performance
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Business activity over the last 30 days
                          </p>
                        </div>

                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="mt-8 flex h-28 items-end gap-2">
                        {chartValues.map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            whileInView={{
                              height: `${height}%`,
                              opacity: 1,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.7,
                              delay: index * 0.05,
                              ease,
                            }}
                            whileHover={{
                              scaleY: 1.08,
                            }}
                            className="flex-1 origin-bottom rounded-sm bg-purple-900/20 transition-colors duration-300 hover:bg-purple-800/40"
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Things to Review */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.7,
                        ease,
                      }}
                      className="rounded-xl border bg-background p-5"
                    >
                      <p className="text-sm font-semibold">
                        Things to review
                      </p>

                      <div className="mt-5 space-y-4">
                        {reviewItems.map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{
                              opacity: 0,
                              x: 10,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.12,
                              ease,
                            }}
                            className="flex items-center gap-2.5"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />

                            <span className="text-xs text-muted-foreground">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedBorder>
          </motion.div>
        </motion.div>
      </section>


      {/* =================================
          FEATURES
      ================================= */}

      <motion.section
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="border-t bg-muted/20"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium text-primary">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A workspace built around getting things done.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Keep the important parts of your work connected without
              constantly switching between different tools.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                >
                  <AnimatedBorder
                    radius="rounded-xl"
                    intensity="normal"
                  >
                    <Card className="h-full rounded-xl border-transparent bg-background">
                      <CardContent className="p-6">
                        <motion.div
                          whileHover={{
                            rotate: 6,
                            scale: 1.08,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/50"
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>

                        <h3 className="mt-5 text-sm font-semibold">
                          {feature.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedBorder>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>


      {/* =================================
          CTA
      ================================= */}

      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
          >
            <AnimatedBorder
              radius="rounded-2xl"
              intensity="strong"
              className="mx-auto max-w-3xl"
            >
              <div className="rounded-2xl bg-background px-6 py-14 sm:px-12">
                <motion.div
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/50"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>

                <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to get more organized?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                  Bring your work together and start building a clearer,
                  more focused workflow.
                </p>

                <Button
                  size="lg"
                  className="group mt-8 px-7"
                  onClick={() =>
                    navigate(currentUser ? "/dashboard" : "/sign-up")
                  }
                >
                  {currentUser ? "Open dashboard" : "Get started"}

                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </AnimatedBorder>
          </motion.div>
        </div>
      </section>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-5 w-5 object-contain"
            />

            <span className="text-xs font-medium">
              Practice Workspace
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Built to keep work simple and focused.
          </p>
        </div>
      </footer>
    </main>
  );
};