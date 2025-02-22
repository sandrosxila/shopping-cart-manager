"use client";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLinkProps = React.PropsWithChildren<{
  href: string;
}>;

export const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname();

  return (
    <span className={href == pathname ? "font-bold" : ""}>{children}</span>
  );
};
