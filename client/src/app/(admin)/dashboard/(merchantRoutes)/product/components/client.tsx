"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { useParams } from "next/navigation";
import { columns, ProductColumn } from "./columns";
import { useRouter } from "next/navigation";

interface ProductClientProps {
  data: ProductColumn[];
}


const ProductClient = ({data}: ProductClientProps) => {
  
  const router = useRouter();
  console.log(data)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="product" description="Manage product" />
        <Button onClick={() => router.push(`/dashboard/product/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
     

    </>
  );
};

export default ProductClient;
