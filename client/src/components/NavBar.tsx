import React, { Children } from "react";
import { ModeToggle } from "./Toggle";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  
}

const NavBar = ({ children, className }: Props) => {
  return (
    <nav className="fixed top-0 flex sm:justify-between justify-end px-5 md:px-20 py-1 sm:py-3 w-full sm:items-center items-end z-50 shadow-md shadow-gray-200 dark:shadow-gray-950 border-b backdrop-blur-xl dark:backdrop-blur-xl  bg-background/55 dark:bg-background/85 ">
      <div className={cn(className)}>{children}</div>
      <div className="hidden sm:block">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
