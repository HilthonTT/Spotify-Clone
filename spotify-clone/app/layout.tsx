import "./globals.css";

import type { Metadata } from "next";

import { Figtree } from "next/font/google";

import { cn } from "@/lib/utils";
import { SupabaseProvider } from "@/providers/supabase-provider";
import { UserProvider } from "@/providers/user-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toaster-provider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <UserProvider>
        <html lang="en" className="h-full">
          <body className={cn("h-full", font.className)}>
            <ModalProvider />
            <ToastProvider />
            {children}
          </body>
        </html>
      </UserProvider>
    </SupabaseProvider>
  );
}
