"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./components/ThemeToggle";
import LightningEffect from "./components/LightningEffect";

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <title>Invitation Emma Kanaya</title>
        <meta
          name="description"
          content="Spook Tacular Party - Emma-Kanaya's 5th Birthday"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Creepster&family=Griffy&family=Emilys+Candy&family=Crimson+Pro:wght@400;600&family=IM+Fell+English&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="min-h-screen relative overflow-hidden">
            {mounted && <LightningEffect />}
            <ThemeToggle />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
