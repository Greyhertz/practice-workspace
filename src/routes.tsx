import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/ui/layout/main-layout";
import DashboardLayout from "./components/ui/layout/dashboard-layout";
import Analytics from "./pages/sub-pages/analytics";
import MiniCRM from "./pages/sub-pages/mini-crm";
import Expense from "./pages/sub-pages/expense";
import { HomePage } from "./pages/home-page";
import Booking from "./pages/sub-pages/booking";
import TaskManager from "./pages/sub-pages/task-manger";
import SignUpPage from "./pages/signup-page";
import LoginPage from "./pages/login-page";
import ProtectedRoute from "./components/protectedRoute";
import { ClientDetails } from "./pages/sub-pages/client-details";
import { ProUserPage } from "./pages/sub-pages/pro-user-page";
import { ActivityFeeds } from "./pages/Activity-Feed";
// import {SignUpPage} from "./pages/signup-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "login", element: <LoginPage /> },
      // { path: '*', element: <NotFound /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Analytics /> },
      { path: "analytics", element: <Analytics /> },
      { path: "clients", element: <MiniCRM /> },
      { path: "clients/:id", element: <ClientDetails /> },
      { path: "pro-user", element: <ProUserPage /> },
      { path: "expenses", element: <Expense /> },
      { path: "bookings", element: <Booking /> },
      { path: "task-manager", element: <TaskManager /> },
      {path: "activity-logs", element: <ActivityFeeds />} 
    ],
  },

  // Legacy standalone admin route
  // {
  //   path: '/admin',
  //   element: (
  //     <ProtectedRoute requiredRole="admin">
  //       <AdminDashboard />
  //     </ProtectedRoute>
  //   ),
  // },

  // // Dashboard (protected)

  // { path: '/form', element: <UseQueryForm /> },
]);
