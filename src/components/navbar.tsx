import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
              <span className="p-4 font-bold lg:inline-block">
                Take Home
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/80"
                href="/"
              >
                Products
              </Link>
              <Link
                className="transition-colors hover:text-foreground/80 text-foreground/80"
                href="/cart"
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
