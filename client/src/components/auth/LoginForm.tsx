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
import { ReloadIcon } from "@radix-ui/react-icons";
// import { cookies } from "next/headers";


interface Props {}

const schema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Please enter a valid Email" }),
  password: z.string({ required_error: "Password is Required" }).min(6),
});

export type IForm = z.infer<typeof schema>;

const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
        defaultValues: {
      email: "",
      password: "",
    },
    
  });

  const onSubmit = async(data: IForm) => {
    console.log(data)
    
    const res = await axios.post(apiRoute.login, data, {
      withCredentials: true,
    });
    if(res.status===200){
      // const cookieStore = cookies();
      // const user = JSON.parse(cookieStore.get("user")?.value || "{}");
      // console.log(user)
      // router.push("/")
    }
  };
  console.log(form.formState)
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="pb-2">Login</CardTitle>
        <CardDescription>Login to your account in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
            <Link
              href="/forgot-password"
              className="text-sm self-end space-y-2 text-muted-foreground"
            >
              Forgot Password?
            </Link>
            <Button
              type="submit"
              className="w-full mt-2 disabled:opacity-70 disabled:pointer-events-none"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting&&(

              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </form>
        </Form>
      </CardContent>

      <Separator className="mb-4" />
      <CardFooter className="flex flex-start justify-center gap-2 ">
        <h3 className="text-sm text-muted-foreground">New Here?</h3>
        <Link
          href="/signup"
          className="text-sm text-foreground hover:underline"
        >
          Create Account
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
