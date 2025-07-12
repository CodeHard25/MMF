import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50/30 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
      <div className="text-center elevate-card-glass p-12 max-w-md mx-6">
        <h1 className="text-6xl font-bold text-amber-800 dark:text-amber-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">Page Not Found</h2>
        <p className="text-lg text-stone-600 dark:text-stone-400 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button className="elevate-button elevate-hover-lift">
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
