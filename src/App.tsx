import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
import { DestinationDashboard } from "./pages/destination-dashboard";
// import Dashboard from "./pages/dashboard";
import { router } from "./routes";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AppProviders> */}
        {/* <Toaster richColors position="bottom-right" /> */}
        <RouterProvider router={ router } />
      {/* </AppProviders> */}
    </QueryClientProvider>
  );
}
