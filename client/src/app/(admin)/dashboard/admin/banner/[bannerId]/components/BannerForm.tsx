"use client";
import { Banner } from "@/lib/types";
import React, { Suspense } from "react";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { apiRoute } from "@/utils/apiRoutes";
import { toast } from "@/components/ui/use-toast";

// import { AlertModal } from "@/components/modals/alert-modal";
// import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  description: z.string().min(1),
  url: z.string().min(1),
  name: z.string().min(1),
});

type BannerFormValues = z.infer<typeof formSchema>;

interface Props {
  initialData: Banner | null;
}

const BannerForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(initialData)

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      description: "", 
      name: "", 
      url: "",
    },
  });

  const title = initialData ? "Edit Banner" : "Create Banner";
  const description = initialData ? "Edit a Banner." : "Add a new Banner";
  const toastMessage = initialData ? "Banner updated." : "Banner created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: BannerFormValues) => {
    try {
      setLoading(true);
      let res;
      if (initialData) {
        res = await axios.patch(`${apiRoute.banner}/${initialData.id}`, data, {
          withCredentials: true,
        });
      } else {
        res = await axios.post(`${apiRoute.banner}`, data, {
          withCredentials: true,
        });
      }
      if (res.status === 200 || res.status === 201) {
      }
      router.refresh();
      router.push(`/dashboard/admin/banner/`);
      toast({
        title: "Success",
        description: "Banner Created Successfully",
      });
    } catch (error: any) {
      // toast.error("Something went wrong.");
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    // try {
    //   setLoading(true);
    //   await axios.delete(
    //     `/api/${params.storeId}/billboards/${params.billboardId}`
    //   );
    //   router.refresh();
    //   router.push(`/${params.storeId}/billboards`);
    //   toast.success("Billboard deleted.");
    // } catch (error: any) {
    //   toast.error(
    //     "Make sure you removed all categories using this billboard first."
    //   );
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };
  //TODO: category
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Banner Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Banner Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BannerForm;
