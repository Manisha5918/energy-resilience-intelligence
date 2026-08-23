import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

import AppShell from "@/components/layout/AppShell";

export const metadata = {
  title: "EnergyShield | AI-Driven Energy Supply Chain Resilience",
  description: "National energy security decision-support platform evaluating geopolitical risk, maritime chokepoints, strategic reserves, and adaptive procurement.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-sky-500/20 selection:text-sky-900 tactical-grid-bg font-body">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
