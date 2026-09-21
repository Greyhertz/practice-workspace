"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-10 h-10 rounded-full">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // Use resolvedTheme to accurately detect "system" fallback settings
  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className="group relative h-8 w-8 overflow-hidden rounded-full p-0 transition-all duration-300 ease-in-out hover:w-20 bg-background"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Track container that moves horizontally on hover */}
        <div className="relative h-full w-full">
          
          {/* Light Mode Active State */}
          <div className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-300 ${
            isDark 
              ? "opacity-0 scale-50 group-hover:left-[25%] group-hover:opacity-100 group-hover:scale-100" 
              : "opacity-100 scale-100 group-hover:left-[25%]"
          }`}>
            <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
          </div>

          {/* Center Switch Pill Slider (Only expands and colors on hover) */}
          <div className={`absolute top-1.5 h-7 w-7 rounded-full bg-muted shadow-sm transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 ${
            isDark ? "left-[45px]" : "left-[7px]"
          }`} />

          {/* Dark Mode Active State */}
          <div className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-300 ${
            isDark 
              ? "opacity-100 scale-100 group-hover:left-[75%]" 
              : "opacity-0 scale-50 group-hover:left-[75%] group-hover:opacity-100 group-hover:scale-100"
          }`}>
            <Moon className="h-[1.2rem] w-[1.2rem] text-blue-400" />
          </div>

        </div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
