import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Statistics", href: "/statistics" },
];

const NavBar = () => {
  return (
    <nav>
      <div className="flex border-b-2 p-1 justify-center gap-20">
        {navigationItems.map((item) => (
          <div key={item.name}>
            <a href={item.href} className="underline">
              {item.name}
            </a>
          </div>
        ))}
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
