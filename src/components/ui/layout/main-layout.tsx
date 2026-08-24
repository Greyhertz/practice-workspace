// layouts/MainLayout.tsx
import type { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import Navbar from '../components/core/Navbar';
// import ScrollButton from '@/components/core/Scroll';
// import Footer from '@/components/core/Footer';
// import { Toaster } from 'sonner';
import { Navbar } from '@/components/navbar';

// import Footer from './Footer';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dark, setDark] = useState(false);
  
  // Get page name from pathname
  const getPageName = (pathname: string) => {
    const path = pathname.replace('/', '');
    if (!path) return 'Home';

    // Convert path to readable name
    return path
      .split('-')
      .map(word => word
.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currentPageName = getPageName(location.pathname);

  useEffect(() => {
    // Skip loading animation for home page
    if (location.pathname === '/' || location.pathname === '') {
      setIsTransitioning(false);
      window.scrollTo(0, 0);
      return;
    }

    // Show loading for other pages
    setIsTransitioning(true);

    // Scroll to top immediately for any navigation (including back/forward)
    window.scrollTo(0, 0);

    // Show loading for at least 2 seconds
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname, location.key]);

  return (
    <>
      {/* Global Animation Styles */}


      {isTransitioning ? (
        // Simple full-screen skeleton
        <div className="">
          
        </div>
      ) : (
        // Normal layout with navbar and footer
        <div className={dark ? "dark" : ""}>
        <div  className="min-h-screen bg-background text-foreground animate-fade-in">
          <Navbar />

          {/* Main Content */}
          <main className="">
            <div className="animate-fade-in-up">{children || <Outlet />}</div>
          </main>

          {/* <Toaster /> */}

          {/* Footer and Scroll Button */}
        </div>
        </div>
      ) }
      
    </>
    
  );
}
