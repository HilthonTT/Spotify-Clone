"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  href: string;
  active?: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md 
        font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && "text-white"
      )}>
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};
