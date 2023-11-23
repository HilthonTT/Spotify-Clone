import "./globals.css";

import type { Metadata } from "next";

import { Figtree } from "next/font/google";

import { cn } from "@/lib/utils";
import { Player } from "@/components/player";
import { SupabaseProvider } from "@/providers/supabase-provider";
import { UserProvider } from "@/providers/user-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toaster-provider";
import { getActiveProducts } from "@/actions/get-active-products";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getActiveProducts();

  return (
    <SupabaseProvider>
      <UserProvider>
        <html lang="en" className="h-full">
          <body className={cn("h-full", font.className)}>
            <ModalProvider products={products} />
            <ToastProvider />
            <Player />
            {children}
          </body>
        </html>
      </UserProvider>
    </SupabaseProvider>
  );
}
