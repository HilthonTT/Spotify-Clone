"use client";

import { MyUserContextProvider } from "@/hooks/use-user";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};
