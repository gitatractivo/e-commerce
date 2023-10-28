"use client";
import { Banner, Category } from "@/lib/types";
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
import DeleteAlert from "@/components/ui/delete-alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  description: z.string().min(1),
  url: z.string().min(1),
  name: z.string().min(1),
  categoryId: z.string().min(1),
});

type BannerFormValues = z.infer<typeof formSchema>;

interface Props {
  initialData: Banner | null;
  categories: Category[];
}

const BannerForm = ({ initialData, categories }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      description: "",
      name: "",
      url: "",
      categoryId: "",
    },
  });

  const title = initialData ? "Edit Banner" : "Create Banner";
  const description = initialData ? "Edit a Banner." : "Add a new Banner";
  const toastMessage = initialData ? "Banner updated." : "Banner created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: BannerFormValues) => {
    console.log(data);
    const formf  = data as any
    if(data.categoryId==="home") formf.categoryId=null
    console.log(data);

    // try {
    //   setLoading(true);
    //   let res;
    //   console.log("initialData", !!initialData, initialData);
    //   if (!!initialData) {
    //     console.log("initialData");
    //     res = await axios.patch(`${apiRoute.banner}/${initialData.id}`, data, {
    //       withCredentials: true,
    //     });
    //   } else {
    //     res = await axios.post(`${apiRoute.banner}`, data, {
    //       withCredentials: true,
    //     });
    //   }
    //   if (res.status === 200 || res.status === 201) {
    //     router.refresh();
    //     router.push(`/dashboard/admin/banner/`);
    //     toast({
    //       title: "Success",
    //       description:
    //         "Banner " + (initialData ? "Edited" : "Created") + " Successfully",
    //     });
    //   }
    // } catch (error: any) {
    //   // toast.error("Something went wrong.");
    //   toast({
    //     title: "Error",
    //     description: error.message,
    //     variant: "destructive",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${apiRoute.banner}/${initialData!.id}`, {
        withCredentials: true,
      });
      router.refresh();
      router.push(`/dashboard/admin/banner`);
      toast({
        title: "Success",
        description: "Banner Deleted Successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  //TODO: category
  return (
    <>
      {!!initialData && (
        <DeleteAlert
          isOpen={open}
          label={initialData.name + " Banner"}
          onDelete={onDelete}
          loading={loading}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading || open}
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
                // console.log(field);
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
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                console.log(field)
                return(
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem key={"home"} value={"home"}>
                          {"Home"}
                        </SelectItem>

                        {categories.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}}
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
