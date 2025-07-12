import React from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "./components/ui/toaster.tsx";
import { Toaster as Sonner } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeProvider from "./components/ThemeProvider.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import NotFound from "./pages/NotFound.tsx";

// Use React.lazy for code splitting
const Index = lazy(() => import("./pages/Index.tsx"));
const BeforeAfter = lazy(() => import("./pages/BeforeAfter.tsx"));
const StylesPage = lazy(() => import("./pages/StylesPage.tsx"));
const GroomingPage = lazy(() => import("./pages/GroomingPage.tsx"));
const DevelopmentPage = lazy(() => import("./pages/DevelopmentPage.tsx"));
const FashionChatPage = lazy(() => import("./pages/FashionChatPage.tsx"));
const VirtualTryOnPage = lazy(() => import("./pages/VirtualTryOnPage.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      gcTime: 900000, // 15 minutes (replaced cacheTime)
      refetchOnWindowFocus: false, // Prevent refetching on window focus
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-screen">
                  <div className="animate-pulse text-xl font-medium text-elevate-brown dark:text-elevate-beige">
                    Loading...
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/styles" element={<StylesPage />} />
                <Route path="/grooming" element={<GroomingPage />} />
                <Route path="/development" element={<DevelopmentPage />} />
                <Route path="/before-after" element={<BeforeAfter />} />
                <Route path="/fashion-chat" element={<FashionChatPage />} />
                <Route path="/virtual-tryon" element={<VirtualTryOnPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
