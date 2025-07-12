import React, { useState } from "react";
import { Button } from "./ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import UserProfileModal from "./UserProfileModal.tsx";
import { LogIn, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle.tsx";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Avatar, AvatarFallback } from "./ui/avatar.tsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-elevate-navy/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl md:text-2xl font-bold"
          >
            <span className="text-amber-800 dark:text-amber-400">
              MMF
              <span className="text-amber-600 dark:text-amber-300 text-sm ml-1 ">
                Men's Mastery Framework
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600  dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
          >
            Home
          </Link>
          <Link
            to="/styles"
            className="text-gray-600  dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
          >
            Styles
          </Link>
          <Link
            to="/grooming"
            className="text-gray-600 dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
          >
            Grooming
          </Link>
          <Link
            to="/development"
            className="text-gray-600 dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
          >
            Development
          </Link>
          <Link
            to="/before-after"
            className="text-gray-600 dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
          >
            Before & After
          </Link>
          {user && (
            <>
              <Link
                to="/fashion-chat"
                className="text-gray-600 dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
              >
                AI Chat
              </Link>
              <Link
                to="/virtual-tryon"
                className="text-gray-600 dark:text-gray-800 hover:text-elevate-purple dark:hover:text-elevate-yellow-light transition-colors"
              >
                Virtual Try-On
              </Link>
            </>
          )}
          <ThemeToggle />

          {user
            ? (
              <div className="flex items-center space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline">Profile</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Your Profile</DialogTitle>
                    </DialogHeader>
                    <UserProfileModal />
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={handleAuthAction}
                  disabled={loading}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            )
            : (
              <Button
                onClick={handleAuthAction}
                disabled={loading}
                className="elevate-button ml-4 bg-gradient-to-r from-elevate-purple to-elevate-vibrant-blue flex items-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? "Loading..." : "Login with Google"}</span>
              </Button>
            )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-elevate-navy border-b border-gray-200 dark:border-gray-800 py-4 px-6 animate-fade-in z-50">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/styles"
              className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
              onClick={toggleMenu}
            >
              Styles
            </Link>
            <Link
              to="/grooming"
              className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
              onClick={toggleMenu}
            >
              Grooming
            </Link>
            <Link
              to="/development"
              className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
              onClick={toggleMenu}
            >
              Development
            </Link>
            <Link
              to="/before-after"
              className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
              onClick={toggleMenu}
            >
              Before & After
            </Link>
            {user && (
              <>
                <Link
                  to="/fashion-chat"
                  className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                  onClick={toggleMenu}
                >
                  AI Chat
                </Link>
                <Link
                  to="/virtual-tryon"
                  className="text-gray-600 dark:text-gray-300 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                  onClick={toggleMenu}
                >
                  Virtual Try-On
                </Link>
              </>
            )}

            {user
              ? (
                <div className="flex flex-col space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex items-center space-x-2 justify-center"
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Your Profile</DialogTitle>
                      </DialogHeader>
                      <UserProfileModal />
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={handleAuthAction}
                    disabled={loading}
                    variant="outline"
                    className="w-full flex items-center space-x-2 justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              )
              : (
                <Button
                  onClick={handleAuthAction}
                  disabled={loading}
                  className="elevate-button w-full bg-gradient-to-r from-elevate-purple to-elevate-vibrant-blue flex items-center space-x-2 justify-center"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? "Loading..." : "Login with Google"}</span>
                </Button>
              )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
