import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-elevate-navy border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-elevate-purple to-elevate-vibrant-blue flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400">
                MMF<span className="text-amber-600 dark:text-amber-300 text-sm ml-1">
                  Men's Mastery Framework
                </span>
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-900 mb-4">
              Master your style, command your presence, transform your life.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-900">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/styles"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Style Explorer
                </Link>
              </li>
              <li>
                <Link
                  to="/grooming"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Grooming Advisor
                </Link>
              </li>
              <li>
                <Link
                  to="/development"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Personal Development
                </Link>
              </li>
              <li>
                <Link
                  to="/before-after"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Before & After
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-900">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-900 hover:text-elevate-purple dark:hover:text-elevate-purple-light transition-colors"
                >
                  Affiliate Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-900">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-elevate-purple/10 flex items-center justify-center hover:bg-elevate-purple/20 transition-colors text-elevate-purple"
              >
                <span className="sr-only">Instagram</span>
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
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z">
                  </path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-elevate-purple/10 flex items-center justify-center hover:bg-elevate-purple/20 transition-colors text-elevate-purple"
              >
                <span className="sr-only">TikTok</span>
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
                  className="lucide lucide-tiktok"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                  <path d="M16 8v8"></path>
                  <path d="M20 12c-3.3 0-6-2.7-6-6V4"></path>
                  <path d="M9 12V4"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-900">
          <p>&copy; {currentYear} ElevateX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
