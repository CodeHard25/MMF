import React from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Button } from "../components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.tsx";
import UserProfileModal from "../components/UserProfileModal.tsx";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { LogIn } from "lucide-react";

const Index = () => {
  const { user, signInWithGoogle, loading } = useAuth();

  const handleGetStarted = async () => {
    if (!user) {
      await signInWithGoogle();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80"
              alt="Stylish man"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-6 h-full relative z-10 flex items-center">
            <div className="max-w-2xl text-white animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-semibold mb-4">
                Master Your Style, Command Your Life
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/90">
                Unlock your masculine potential through strategic style mastery,
                refined grooming excellence, and unshakeable confidence that
                commands respect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user
                  ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="elevate-button px-8 py-6 text-lg">
                          Get Started
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create Your Profile</DialogTitle>
                        </DialogHeader>
                        <UserProfileModal />
                      </DialogContent>
                    </Dialog>
                  )
                  : (
                    <Button
                      onClick={handleGetStarted}
                      disabled={loading}
                      className="elevate-button px-8 py-6 text-lg flex items-center space-x-2"
                    >
                      <LogIn className="w-5 h-5" />
                      <span>
                        {loading ? "Loading..." : "Login to Get Started"}
                      </span>
                    </Button>
                  )}
                <Button
                  variant="outline"
                  className="elevate-button-outline px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16 bg-gray-50 dark:bg-elevate-gray-charcoal/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-semibold text-center mb-12 text-elevate-brown-dark dark:text-elevate-beige-light">
              Your Complete Style & Development Platform
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Style Dashboard Card */}
              <div className="light-card p-6 border border-elevate-beige-dark/20 flex flex-col h-full group hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 bg-beige-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-elevate-brown-light/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-elevate-brown"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                    </path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-elevate-brown-chocolate dark:text-elevate-beige">
                  Personalized Style Dashboard
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  Create your style profile and get personalized
                  recommendations.
                </p>
                <Link to="/styles">
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-elevate-grey-light to-elevate-beige-dark hover:bg-elevate-brown-chocolate text-elevate-brown-chocolate dark:text-elevate-beige-dark hover:text-white transition-all duration-200"
                  >
                    Explore Styles
                  </Button>
                </Link>
              </div>

              {/* AI Fashion Chat Card */}
              <div className="light-card p-6 border border-elevate-beige-dark/20 flex flex-col h-full group hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 bg-beige-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-elevate-brown-light/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-elevate-brown"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                    </path>
                    <circle cx="12" cy="11" r="1"></circle>
                    <circle cx="8" cy="11" r="1"></circle>
                    <circle cx="16" cy="11" r="1"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-elevate-brown-chocolate dark:text-elevate-beige">
                  AI Fashion Chat
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  Chat with our AI fashion expert for personalized outfit
                  recommendations.
                </p>
                {user
                  ? (
                    <Link to="/fashion-chat">
                      <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-elevate-grey-light to-elevate-beige-dark hover:bg-elevate-brown-chocolate text-elevate-brown-chocolate dark:text-elevate-beige-dark hover:text-white transition-all duration-200"
                      >
                        Start Chatting
                      </Button>
                    </Link>
                  )
                  : (
                    <Button
                      onClick={handleGetStarted}
                      disabled={loading}
                      variant="outline"
                      className="w-full bg-gradient-to-r from-elevate-beige to-elevate-beige-dark hover:from-elevate-brown-light hover:to-elevate-brown text-elevate-brown-chocolate dark:text-elevate-beige-dark hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login to Chat</span>
                    </Button>
                  )}
              </div>

              {/* Grooming Card */}
              <div className="soft-card p-6 border border-elevate-beige-dark/20 flex flex-col h-full group hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 bg-beige-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-elevate-brown-light/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-elevate-brown"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z">
                    </path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-elevate-brown-chocolate dark:text-elevate-beige">
                  Grooming Advisor
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  Get tailored skincare and haircare recommendations.
                </p>
                <Link to="/grooming">
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-elevate-grey-light to-elevate-beige-dark hover:bg-elevate-brown-chocolate text-elevate-brown-chocolate dark:text-elevate-beige-dark hover:text-white transition-all duration-200"
                  >
                    Grooming Tips
                  </Button>
                </Link>
              </div>

              {/* Personal Development Card */}
              <div className="neutral-card p-6 border border-elevate-beige-dark/20 flex flex-col h-full group hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 bg-beige-gradient rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-elevate-brown-light/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-elevate-brown"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76">
                    </polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2 text-elevate-brown-chocolate dark:text-elevate-beige">
                  Personal Development
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  Learn charisma, communication, and confidence techniques.
                </p>
                <Link to="/development">
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-elevate-grey-light to-elevate-beige-dark hover:bg-elevate-brown-chocolate text-elevate-brown-chocolate dark:text-elevate-beige-dark hover:text-white transition-all duration-200"
                  >
                    Develop Yourself
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Teaser */}
        <section className="py-16 bg-warm-beige-gradient dark:bg-dark-brown-gradient">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-elevate-brown-dark dark:text-elevate-beige-light">
                Transformation Success Stories
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
                See real results from men who have transformed their style,
                grooming, and confidence with Men's Mastery Framework.
              </p>
            </div>

            <div className="flex justify-center">
              <Link to="/before-after">
                <Button className="elevate-button px-8 py-6 text-lg">
                  View Before & After
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-sand-brown-gradient dark:bg-charcoal-gradient text-elevate-brown-chocolate dark:text-elevate-beige-light">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Master Your Style?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-elevate-brown-dark dark:text-elevate-beige">
              Join thousands of men who are transforming their appearance and
              confidence with Men's Mastery Framework.
            </p>

            {user
              ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-elevate-brown-dark text-elevate-beige hover:bg-elevate-brown px-8 py-6 text-lg font-medium">
                      Create Your Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Your Profile</DialogTitle>
                    </DialogHeader>
                    <UserProfileModal />
                  </DialogContent>
                </Dialog>
              )
              : (
                <Button
                  onClick={handleGetStarted}
                  disabled={loading}
                  className="bg-elevate-brown-dark text-elevate-beige hover:bg-elevate-brown px-8 py-6 text-lg font-medium flex items-center space-x-2 mx-auto"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{loading ? "Loading..." : "Login to Get Started"}</span>
                </Button>
              )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
