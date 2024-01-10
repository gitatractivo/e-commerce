"use client";
import { Category } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import DeleteAlert from "@/components/ui/delete-alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { apiRoute } from "@/utils/apiRoutes";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface Props {
  initialData: Category | null;
}

const CategoryForm = ({ initialData }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  console.log(initialData)

  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData ? "Edit a Color." : "Add a new Color";
  const toastMessage = initialData ? "Color updated." : "Color created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      let res;
      
      if (!!initialData) {
        res = await axios.patch(`${apiRoute.color}/${initialData.id}`, data, {
          withCredentials: true,
        });
      } else {
        res = await axios.post(`${apiRoute.color}`, data, {
          withCredentials: true,
        });
      }
      if (res.status === 200 || res.status === 201) {
        router.refresh();
        router.push(`/dashboard/color/`);
        toast({
          title: "Success",
          description:
            "Color " + (initialData ? "Edited" : "Created") + " Successfully",
        });
      }
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
    try {
      setLoading(true);
      const res = await axios.delete(`${apiRoute.color}/${initialData!.id}`, {
        withCredentials: true,
      });
      router.refresh();
      router.push(`/dashboard/color`);
      toast({
        title: "Success",
        description: "Color Deleted Successfully",
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
          label={initialData.name + " Color"}
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
         
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) =>  (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Color Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) =>  (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Color Value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
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

export default CategoryForm;
