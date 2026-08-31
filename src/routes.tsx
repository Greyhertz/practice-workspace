import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/ui/layout/main-layout";
import DashboardLayout from "./components/ui/layout/dashboard-layout";
import Analytics from "./pages/sub-pages/analytics";
import MiniCRM from "./pages/sub-pages/mini-crm";
import Expense from "./pages/sub-pages/expense";
import { HomePage } from "./pages/home-page";
import Booking from "./pages/sub-pages/booking";
import TaskManager from "./pages/sub-pages/task-manger";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage />},
      // { path: '*', element: <NotFound /> },
    ],
  },

  {path:'/dashboard',element : <DashboardLayout/>,
    children: [
      {path: 'analytics', element: <Analytics />},
      {path: 'clients', element: <MiniCRM />},
      {path: 'expenses', element: <Expense />},
      {path: 'bookings', element: <Booking />},
      {path: 'task-manager', element: <TaskManager />},
      // {path: 'analytics', element: <Analytics />},
    ]
    
  }

  

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