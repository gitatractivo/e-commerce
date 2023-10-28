"use client";
import React, { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DeleteAlertProps {
  label: String;
  onDelete: () => void;
  isOpen: boolean;
  loading: boolean;
}
const DeleteAlert = ({
  label,
  onDelete,
  isOpen,
  loading,
}: DeleteAlertProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <Alert variant="destructive" className="flex justify-between mb-8">
          <div>
            <div className="flex gap-2">

            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            </div>
            <AlertDescription>
              You are about to delete this {label}
            </AlertDescription>
          </div>
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => onDelete()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </Alert>
      )}
    </>
  );
};

export default DeleteAlert;
