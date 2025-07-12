import React, { lazy, Suspense } from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

// Lazy load the GroomingAdvisor component
const GroomingAdvisor = lazy(() => import("../components/GroomingAdvisor.tsx"));

const GroomingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative py-10">
          <div className="absolute inset-0 bg-gradient-to-b from-elevate-purple/10 to-transparent pointer-events-none">
          </div>
          <div className="container mx-auto px-4 md:px-6 py-8 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-800 dark:text-amber-400">
                Grooming Advisor
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Get tailored skincare and haircare recommendations based on your
                skin type, scalp type, and specific concerns.
              </p>
            </div>
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <div className="animate-pulse text-elevate-purple text-xl">
                    Loading advisor...
                  </div>
                </div>
              }
            >
              <GroomingAdvisor />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(GroomingPage);
