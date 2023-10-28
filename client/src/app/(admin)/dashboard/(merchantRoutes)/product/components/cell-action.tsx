"use client";
import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { AlertModal } from "@/components/modals/alert-modal";

import { ProductColumn } from "./columns";
import { apiRoute } from "@/utils/apiRoutes";
import { toast } from "@/components/ui/use-toast";
import DeleteAlert from "@/components/ui/delete-alert";
import Loader from "@/components/ui/Loader";

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${apiRoute.product}/${data!.id}`, {
        withCredentials: true,
      });
      router.refresh();
      toast({
        title: "Success",
        description: "Product Deleted Successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Product Deleted Successfully",
        variant:"destructive"
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  

  return (
    <>
      {!!data && (
        <DeleteAlert
          isOpen={open}
          label={data.name + " Product"}
          onDelete={onConfirm}
          loading={loading}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/product/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onConfirm()}>
            <Trash className="mr-2 h-4 w-4" /> Delete
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
