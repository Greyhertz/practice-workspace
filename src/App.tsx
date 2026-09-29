import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./proivider/theme-provider"; // Note: watch out for the typo in your folder name "proivider"
import { Toaster } from "sonner";
// import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient(); // Move this outside the render to prevent resetting on every re-render

export default function App() {
return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            success: "app-toast-success",
            warning: "app-toast-warning",
            error: "app-toast-error",
          },
        }}
      />
    </ThemeProvider>
  );
}
