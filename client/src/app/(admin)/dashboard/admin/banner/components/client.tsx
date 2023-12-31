"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { useParams } from "next/navigation";
import { columns, BannerColumn } from "./columns";

interface BannerClientProps {
  data: BannerColumn[];
}


const BannerClient = ({data}: BannerClientProps) => {
  
  const router = useRouter();
  console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Banner" description="Manage Banner" />
        <Button onClick={() => router.push(`/dashboard/admin/banner/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
     

    </>
  );
};

export default BannerClient;
