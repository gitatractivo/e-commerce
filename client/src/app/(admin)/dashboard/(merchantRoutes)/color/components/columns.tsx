"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ColorColumn = {
  id: string;
  name: string;
  description: string;
  categoryId?:string;
  createdAt: string;
  products:number;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  
  
  {
    accessorKey: "createdAt",
    header: "Date",
    
  },
  {
    accessorKey: "products",
    header: "Products",
    
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
