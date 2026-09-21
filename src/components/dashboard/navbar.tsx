import {
  Bell,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  LogOut,
  Search,
  Settings,
  UserRound,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAuthStore } from "@/store/useAuthStore";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  const firstName =
    currentUser?.name?.trim().split(/\s+/)[0] || "there";

  const profileInitials =
    currentUser?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((name) => name[0]?.toUpperCase())
      .join("") || "U";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-background px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile sidebar trigger is handled by Dashboard */}

        {/* Search */}
        <div className="relative hidden w-72 lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-lg bg-muted/40 pl-9 pr-14 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:bg-muted/60"
          />

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md bg-background px-1.5 py-1 text-[10px] text-muted-foreground shadow-sm">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        {/* Mobile title */}
        <div className="lg:hidden">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Practice Lab
          </p>

          <p className="text-sm font-semibold">
            Workspace
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-1">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />

          {/* Notification dot */}
          <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden h-9 w-9 rounded-lg sm:inline-flex"
          aria-label="Help"
        >
          <CircleHelp className="h-4 w-4" />
        </Button>

        {/* Theme */}
        <ModeToggle />

        {/* Profile */}
        <Popover open={profileOpen} onOpenChange={setProfileOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Open profile options"
              className="group ml-1 flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/60"
            >
              {/* Circular avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground ring-1 ring-border/50">
                {profileInitials}
              </div>

              {/* Dropdown indicator */}
              {profileOpen ? (
                <ChevronUp className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
              ) : (
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-72 rounded-xl p-2 shadow-lg border-none"
          >
            {/* Profile header */}
            <div className="mb-1 flex items-center gap-3 rounded-lg p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                {profileInitials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {currentUser?.name || "Your profile"}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="my-1 h-px bg-border/50" />

            <div className="grid gap-1">
              <Button
                variant="ghost"
                className="h-10 justify-start gap-3 rounded-lg text-sm"
                onClick={() => setProfileOpen(false)}
              >
                <UserRound className="h-4 w-4" />
                Profile
              </Button>

              <Button
                variant="ghost"
                className="h-10 justify-start gap-3 rounded-lg text-sm"
                onClick={() => setProfileOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>

              <Button
                variant="ghost"
                onClick={logout}
                className="h-10 justify-start gap-3 rounded-lg text-sm text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};