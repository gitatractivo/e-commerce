"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import axios from "axios";
import { apiRoute } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";



interface Props {}

const schema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Please enter a valid Email" }),
  
});

export type IForm = z.infer<typeof schema>;

const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      
    },
  });

  const onSubmit = async(data: IForm) => {
    console.log(data)
    
    const res = await axios.post(apiRoute.forgotPassword, data, {
      withCredentials: true,
    });
    if(res.status===201){
      toast({
        title:"Success",
        description: res.data.message,
      })
    }
  };
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="pb-2">Forgot Password</CardTitle>
        <CardDescription>Enter Email To Reset Password</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="test@abc.com" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter your email address.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full mt-2 space-y-2">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      
    </Card>
  );
};

export default LoginForm;
