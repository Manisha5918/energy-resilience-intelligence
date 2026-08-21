import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EnergyShield | AI-Driven Energy Supply Chain Resilience",
  description: "National energy security decision-support platform evaluating geopolitical risk, maritime chokepoints, strategic reserves, and adaptive procurement.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070a0f] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 tactical-grid-bg">
        {/* Top Command Navbar */}
        <Navbar />

        <div className="flex flex-1 relative overflow-hidden">
          {/* Persistent Sidebar Navigation */}
          <Sidebar />

          {/* Main Operational Viewport */}
          <main className="flex-1 min-w-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 pb-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
