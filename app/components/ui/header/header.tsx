"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon

// Utility function to check if user is authenticated
const isUserAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("access_token"));
};

// Utility function to handle user logout
const logoutUser = (setIsAuthenticated: (value: boolean) => void) => {
  localStorage.removeItem("access_token");
  setIsAuthenticated(false);
  window.location.reload(); // Refresh page after logout
};

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set authentication state on component mount
    setIsAuthenticated(isUserAuthenticated());
  }, []);

  const handleLogoClick = () => {
    window.location.reload(); // Reload the page on logo click
  };

  return (
    <div className="w-full flex justify-between items-center">
      {/* Logo Section */}
      <a
        className="flex items-center justify-center font-nunito text-lg font-bold gap-2 hover:underline cursor-pointer"
        onClick={handleLogoClick}
      >
        <Image
          className="rounded-xl shadow-2xl border-4 border-white"
          src="/codevlogo.png"
          alt="pa.ai Logo"
          width={200}
          height={100}
          priority
        />
      </a>

      {/* Logout Button Section */}
      {isAuthenticated && (
        <button
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={() => logoutUser(setIsAuthenticated)}
        >
          Log Out <FaSignOutAlt className="ml-2" />
        </button>
      )}
    </div>
  );
}
