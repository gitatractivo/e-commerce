"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type BannerColumn = {
  id: string;
  name: string;
  description: string;
  categoryId?:string;
  createdAt: string;
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
