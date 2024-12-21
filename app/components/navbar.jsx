"use client";

import { useState } from "react";
import Link from "next/link"
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import companyLogo from '../../public/Screenshot_2024-12-20_155518-removebg-preview.png'
export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logoutAuth } = useAuth();
  const router = useRouter();



  const handleLogout = () => {
    logoutAuth();
  };


  return (
    <nav className="bg-white shadow-sm w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 flex justify-between sm:mx-16 lg:mx-24 items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-blueColor">
              {/* Set max height and auto width */}
              <Image
                alt="Company logo"
                src={companyLogo}
                className="h-auto max-h-20 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* Display 'Log in' and 'Sign up' links if the user is not authenticated */}
            {!token ? (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blueColor">
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="py-2 px-4 rounded-md text-white bg-blueColor hover:bg-blueColorHover"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {/* Display 'Profile' or 'Create blog' and 'Logout' if the user is authenticated */}
                <button
                  onClick={() => router.push("/create_blog")}
                  className="py-2 px-4 rounded-md text-white bg-blueColor hover:bg-blueColorHover"
                >
                  Create blog
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blueColor"
                >
                  Log out
                </button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 text-center">
          <div className="px-2 py-4 space-y-2">
            {/* Conditionally render 'Log in' and 'Sign up' for non-authenticated users */}
            {!token ? (
              <>
                <Link href="/login" className="block text-blueColor hover:text-blueColor">
                  Log in
                </Link>
                <Link href="/signup" className="block py-2 px-4 rounded-md text-white bg-blueColor hover:bg-blueColorHover">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {/* Display 'Create blog' and 'Log out' for authenticated users */}
                <button
                  onClick={() => router.push("/create_blog")}
                  className="mt-4 block w-full py-2 px-4 rounded-md text-white bg-blueColor hover:bg-blueColorHover"
                >
                  Create Blog
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 px-4 rounded-md text-gray-700 hover:text-blueColor"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>

  )
}