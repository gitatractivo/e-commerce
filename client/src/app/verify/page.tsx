"use client";

import Loader from "@/components/ui/Loader";
import { useToast,toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

interface props {}

const Page: React.FC<props> = () => {
  const router = useRouter()
  const searchParams = useSearchParams();

  const token = searchParams.get("token");


  console.log(token)
  useEffect(()=>{
    if (!token) {
      console.log("inside");
      toast({
        title: "Wrong Url",
        description: "Wrong url please try again...",
        variant: "destructive",
      });
      router.push("/");
      return;
    }
    const url = new URL("http://localhost:5000/user/verify");
    url.searchParams.set("token",token)
    console.log(url.href)
    const verify = async () => {
      console.log("inside verify")
      const resp = await axios.post(url.href)
      if(resp.status===200){
        toast({
          title:"Email Verified Successfully",
        })
        router.push("/");

      }
      else{
        toast({
          title: "Error verifying Email try again",
          variant:"destructive"
        });
        router.push("/");
      }
    }
    verify()

  },[router,token])
  
  
  




  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center gap-12 p-24">
      <h1 className="text-2xl  tracking-wide">Verifying email</h1>
      <Loader className=" h-12 w-12" />
      
    </div>
  );
};

export default Page;

 
