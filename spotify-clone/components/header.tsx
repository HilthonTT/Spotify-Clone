"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    // TODO: Reset any playing songs
    router.refresh();

    if (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={cn(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => onOpen("auth")}
                  className="bg-transparent text-neutral-300 font-medium">
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => onOpen("auth")}
                  className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
