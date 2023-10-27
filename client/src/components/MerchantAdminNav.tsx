"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type Props = {
  isAdmin: Boolean;
};

const MerchantAdminNav = ({ isAdmin }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      title: "Dashboard",
      path: "/dashboard",
      active: pathname === "/dashboard",
      admin: false,
    },
    {
      title: "Colors",
      path: "/dashboard/color",
      active: pathname === "/dashboard/color",
      admin: false,
    },
    {
      title: "Sizes",
      path: "/dashboard/size",
      active: pathname === "/dashboard/size",
      admin: false,
    },
    {
      title: "Product",
      path: "/dashboard/product",
      active: pathname === "/dashboard/product",
      admin: false,
    },
    {
      title: "Banner",
      path: "/dashboard/admin/banner",
      active: pathname === "/dashboard/admin/banner",
      admin: true,
    },
    {
      title: "Categories",
      path: "/dashboard/admin/category",
      active: pathname === "/dashboard/admin/category",
      admin: true,
    },
    {
      title: "Merchants",
      path: "/dashboard/admin/merchants",
      active: pathname === "/dashboard/admin/merchants",
      admin: true,
    },
  ];

  console.log(isAdmin);
  return (
    <div
      className="flex flex-row sm:items-center justify-end space-x-4 w-full
    items-end lg:space-x-6"
    >
      {routes.map((route, index) => (
        <Link
          key={route.path}
          href={route.path}
          className={cn(
            "hidden sm:block text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-foreground " : "text-muted-foreground"
          )}
        >
          {route.title}
        </Link>
      ))}
      <div className="block sm:hidden self-end justify-self-end w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <HamburgerMenuIcon className="absolute h-[1.2rem] w-[1.2rem] " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Light</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MerchantAdminNav;
