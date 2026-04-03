"use client";

import { useEffect } from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import { initFirebaseAnalytics } from "@/lib/firebase/client";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void initFirebaseAnalytics();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
