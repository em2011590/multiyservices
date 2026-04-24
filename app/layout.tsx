import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import Navbar from "@/components/ui/Navbar";
import CommandPalette from "@/components/ui/CommandPalette";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "DevSphere — Multi-Service Developer Platform",
  description: "Advanced AI-powered tools, stunning 3D visualizations, and seamless developer workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col" style={{ background: '#0a0a0f', color: '#f0f0f0' }}>
        <StoreProvider>
          <Navbar />
          <CommandPalette />
          <main className="flex-1 flex flex-col">{children}</main>
          <Toaster position="bottom-right" toastOptions={{
            style: { background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
          }} />
        </StoreProvider>
      </body>
    </html>
  );
}

