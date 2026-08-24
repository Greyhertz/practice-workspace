import * as Icon from '@phosphor-icons/react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Homepage from './pages/Homepage';

// FIX: A simple placeholder for the /dashboard index so the layout doesn't re-render itself
function DashboardHome() {
  return <Navigate to="/dashboard" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />
    children: [
      { index: true, element: <Homepage /> },
      
     
    ],
  },

  // Public routes (outside MainLayout)
  // { path: 'sidebar', element: <MockSidebar /> },
  // { path: 'settings', element: <SettingsPage /> },
  // { path: 'pricing', element: <PricingPage /> },
  // { path: 'sign-up', element: <SignUpPage /> },
  // { path: 'log-in', element: <SignInPage /> },
  // { path: 'review/:name', element: <Reviewpage /> },
  // { path: 'welcome', element: <Welcome /> },
  // { path: 'my-form', element: <MyForm /> },
  // { path: 'admin-config', element: <AdminConfig /> },

  // Legacy standalone admin route
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },

  // Dashboard (protected)
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requiredRole="user">
        <UserDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // FIX: index was incorrectly rendering <UserDashboardLayout /> again (the layout, not a page).
      // Now it renders nothing extra — the layout's <Outlet /> handles showing the right content.
      { index: true, element: null },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'reviews', element: <MyReviewsPage /> },
      // FIX: Re-enabled RequireAdmin wrapper — was commented out, leaving this route unprotected
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <AdminUsersPage />
          </RequireAdmin>
        ),
      },
    ],
  },

  { path: '/form', element: <UseQueryForm /> },
]);