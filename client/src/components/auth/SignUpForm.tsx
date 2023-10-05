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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";



interface Props {}

const schema = z
  .object({
    name: z.string({
      required_error: "Name is required",
    }),
    password: z.string({
      required_error: "Password is required",
    })
      .min(6, "Password is too short - should be min 6 chars")
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).+$/.test(value),
        {
          message:
            "Password must contain at least one uppercase letter, one digit, and one special character",
        }
      ),
    passwordConfirmation: z.string({
      required_error: "Password confirmation is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    role: z.enum(["USER", "ADMIN", "MERCHANT"]).optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type IForm = z.infer<typeof schema>;

const SignUpForm: React.FC<Props> = () => {
  const router = useRouter()
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation:"",
      name:"",
      role:"USER"
    },
  });

  const onSubmit = async(data: IForm) => {
    console.log(data)
    
    const res = await axios.post("http://localhost:5000/user/create", data, {
      withCredentials: true,
    });

    if(res.status===201){
      toast({
        title:"User Created Successfully",
        description:res.data.message
      })
      router.push('/')
    }
   
  };
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="pb-2">Login</CardTitle>
        <CardDescription>Login to your account in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    Enter your email address.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" ">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="test@abc.com"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Enter your email address.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className=" ">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="test@abc.com"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Enter your email address.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <Separator className="mb-4" />
      <CardFooter className="flex flex-start justify-center gap-2 ">
        <h3 className="text-sm text-muted-foreground">Already a User?</h3>
        <Link
          href="/login"
          className="text-sm text-foreground hover:underline"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
