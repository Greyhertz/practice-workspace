import {
  Activity,
  BarChart3,
  Book,
  Calculator,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  PanelLeftClose,
  Receipt,
  Settings,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
// import logo from "/assets/logo.png";
const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Expense Tracker",
    icon: WalletCards,
    path: "/dashboard/expenses",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/dashboard/analytics",
  },
  {
    label: "Mini CRM",
    icon: Users,
    path: "/dashboard/clients",
  },
  {
    label: "Quote Builder",
    icon: Calculator,
    path: "/dashboard/quote",
  },
  {
    label: "Task Manager",
    icon: CheckSquare,
    path: "/dashboard/task-manager",
  },
  {
    label: "Manage Bookings",
    icon: Book,
    path: "/dashboard/bookings",
  },
  {
    label: "Activity",
    icon: Activity,
    path: "/dashboard/activity-logs",
  },
  {
    label: "Invoices",
    icon: Receipt,
    path: "/dashboard/invoices",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const { state, toggleSidebar } = useSidebar();

  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);

  const profileInitials =
    currentUser?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((name) => name[0]?.toUpperCase())
      .join("") || "U";

  const points = useUserStore((state) => {
    const email = currentUser?.email;

    if (!email) return 0;

    return state.pointsByUser?.[email] || 0;
  });

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/70">
      {/* ─────────────────────────────
          HEADER / LOGO
      ───────────────────────────── */}
      <SidebarHeader className="px-3 pt-4">
        <div
          className={`
      flex h-11 items-center
      ${collapsed ? "justify-center" : "gap-2 px-1"}
    `}
        >
          {/* COLLAPSED: LOGO BECOMES TOGGLE */}
          {collapsed ? (
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Expand sidebar"
              className="
          group/logo
          relative
          flex h-8 w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          transition-colors
          hover:bg-muted/70
        "
            >
              {/* Logo */}
              <img
                src="/logo.png"
                alt="Logo"
                className="
            h-10 w-10
            object-contain
            transition-opacity
            duration-150
            group-hover/logo:opacity-0
          "
              />

              {/* Open sidebar icon */}
              <PanelLeft
                className="
            absolute
            h-4 w-4
            text-muted-foreground
            opacity-0
            transition-opacity
            duration-150
            group-hover/logo:opacity-100
          "
              />
            </button>
          ) : (
            <>
              {/* EXPANDED LOGO */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>

              {/* WORKSPACE NAME */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-purple-600 font-semibold">
                  Practice Workspace
                </p>

                <p className="truncate text-[9px] text-muted-foreground ">
                  Build. Break. Learn.
                </p>
              </div>

              {/* COLLAPSE BUTTON */}
              <button
                type="button"
                onClick={toggleSidebar}
                aria-label="Collapse sidebar"
                className="
            flex h-7 w-7
            shrink-0
            items-center
            justify-center
            rounded-md
            text-muted-foreground/50
            transition-colors
            bg-muted
            hover:bg-muted
            hover:text-foreground
          "
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </SidebarHeader>
      {/* ─────────────────────────────
          NAVIGATION
      ───────────────────────────── */}
      <SidebarContent className="overflow-hidden px-2.5 pt-6">
        <SidebarMenu className="gap-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <SidebarMenuItem
                key={item.path}
                className={`${
                  collapsed ? "justify-center px-0" : "justify-start px-10"
                }`}
              >
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.label}
                  className={`
                    h-9
                    rounded-lg
                    text-xs
                    font-normal
                    transition-colors

                    hover:bg-muted/70
                    hover:text-foreground

                    data-[active=true]:bg-muted
                    data-[active=true]:font-medium
                    data-[active=true]:text-foreground

                    ${collapsed ? "justify-center px-0" : "justify-start px-3"}
                  `}
                >
                  <Link to={item.path}>
                    <Icon className="h-3.5 w-3.5 shrink-0" />

                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* ─────────────────────────────
          PROFILE
      ───────────────────────────── */}
      <SidebarFooter className="px-2.5 pb-4">
        <Popover open={profileOpen} onOpenChange={setProfileOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Open profile options"
              className={`
                group flex w-full items-center
                rounded-lg
                transition-colors
                hover:bg-muted/70

                ${collapsed ? "justify-center p-2" : "gap-2.5 p-2"}
              `}
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground ring-1 ring-border/40">
                {profileInitials}
              </div>

              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-xs font-semibold">
                      {currentUser?.name || "Your profile"}
                    </p>

                    <p className="truncate text-[9px] text-muted-foreground">
                      {currentUser?.email}
                    </p>
                  </div>

                  {profileOpen ? (
                    <ChevronLeft className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground" />
                  )}
                </>
              )}
            </button>
          </PopoverTrigger>

          {/* Profile popup */}
          <PopoverContent
            side="top"
            align={collapsed ? "center" : "start"}
            sideOffset={8}
            className="
              w-64
              rounded-xl
              border
              border-border/60
              bg-popover
              p-2
              shadow-xl
            "
          >
            {/* Account */}
            <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold">
                {profileInitials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">
                  {currentUser?.name || "Your profile"}
                </p>

                <p className="truncate text-[10px] text-muted-foreground">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            {/* Points */}
            <div className="px-2.5 py-2">
              <p className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                Workspace
              </p>

              <p className="mt-1 text-xs">{points} points earned</p>
            </div>

            {/* Actions */}
            <div className="grid gap-0.5">
              <Button
                variant="ghost"
                className="h-9 justify-start gap-3 rounded-lg px-3 text-xs font-normal hover:bg-muted"
                onClick={() => setProfileOpen(false)}
              >
                <UserRound className="h-3.5 w-3.5" />
                Profile
              </Button>

              <Button
                variant="ghost"
                className="h-9 justify-start gap-3 rounded-lg px-3 text-xs font-normal hover:bg-muted"
                onClick={() => setProfileOpen(false)}
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Button>

              <Button
                variant="ghost"
                onClick={logout}
                className="h-9 justify-start gap-3 rounded-lg px-3 text-xs font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
}
