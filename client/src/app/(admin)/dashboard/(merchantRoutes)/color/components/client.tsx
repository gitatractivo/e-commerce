"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { useParams } from "next/navigation";
import { columns, ColorColumn } from "./columns";

interface CategoryClientProps {
  data: ColorColumn[];
}


const CategoryClient = ({data}: CategoryClientProps) => {
  
  const router = useRouter();
  console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Color" description="Manage Color" />
        <Button onClick={() => router.push(`/dashboard/color/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
     

    </>
  );
};

export default CategoryClient;
