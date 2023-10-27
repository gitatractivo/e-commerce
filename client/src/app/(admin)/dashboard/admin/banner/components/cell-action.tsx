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

import { BannerColumn } from "./columns";
import { apiRoute } from "@/utils/apiRoutes";
import { toast } from "@/components/ui/use-toast";

interface CellActionProps {
  data: BannerColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`${apiRoute.banner}/${data.id}`);
      toast({
        title: "Success",
        description: "Banner Deleted Successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Banner Deleted Successfully",
        variant:"destructive"
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Success",
      description: "Banner Copied to clipboard Successfully",
    });
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/admin/banner/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
