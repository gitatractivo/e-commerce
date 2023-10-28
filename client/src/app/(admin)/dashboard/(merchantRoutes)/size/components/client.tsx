"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { useParams } from "next/navigation";
import { columns, SizeColumn } from "./columns";

interface SizeClientProps {
  data: SizeColumn[];
}


const SizeClient = ({data}: SizeClientProps) => {
  
  const router = useRouter();
  console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Size" description="Manage Size" />
        <Button onClick={() => router.push(`/dashboard/size/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
     

    </>
  );
};

export default SizeClient;
