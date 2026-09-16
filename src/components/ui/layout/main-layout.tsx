// layouts/MainLayout.tsx
import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { ModeToggle } from "@/components/mode-toggle"; // 1. IMPORT ADDED HERE

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      setIsTransitioning(false);
      window.scrollTo(0, 0);
      return;
    }
    setIsTransitioning(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

  return (
    <>
      {isTransitioning ? (
        <div className="min-h-screen bg-background" />
      ) : (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
          
          {/* 2. FLOATING MODE TOGGLE CONTAINER ADDED HERE */}
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>

          <Navbar />

          {/* Main Content */}
          <main className="">
            <div className="animate-fade-in-up">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
