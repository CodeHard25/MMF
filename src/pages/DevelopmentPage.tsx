import React from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const DevelopmentPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">Personal Development</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Learn the fundamentals of making a strong impression, connecting
            with others authentically, and projecting confidence.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Confident man"
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-medium">Develop Your Charisma</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn the fundamentals of making a strong impression,
                  connecting with others authentically, and projecting
                  confidence in any situation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-elevate-purple/10 rounded-full flex items-center justify-center mt-1 mr-4">
                    <span className="text-elevate-purple font-semibold">
                      01
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Master Body Language</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Understand the fundamentals of positive body language,
                      from posture to eye contact, and how they impact your
                      interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-elevate-purple/10 rounded-full flex items-center justify-center mt-1 mr-4">
                    <span className="text-elevate-purple font-semibold">
                      02
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">
                      Effective Communication
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Learn conversation techniques that help you connect with
                      anyone, whether in professional settings or social
                      gatherings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-elevate-purple/10 rounded-full flex items-center justify-center mt-1 mr-4">
                    <span className="text-elevate-purple font-semibold">
                      03
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Voice Development</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Discover techniques to optimize your vocal tonality, pace,
                      and projection for maximum impact and presence.
                    </p>
                  </div>
                </div>
              </div>

              <button className="elevate-button">
                Explore Charisma Modules
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DevelopmentPage;
