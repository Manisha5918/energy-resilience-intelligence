"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function AppShell({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Command Navbar with Mobile Menu Trigger */}
      <Navbar 
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)} 
        isMobileMenuOpen={mobileMenuOpen} 
      />

      <div className="flex flex-1 relative items-start">
        {/* Persistent Sticky Desktop Sidebar & Mobile Drawer */}
        <Sidebar 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        {/* Main Operational Viewport */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-8 pb-16">
          {children}
        </main>
      </div>
    </div>
  );
}
