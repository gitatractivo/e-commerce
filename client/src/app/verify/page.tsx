"use client";

import Loader from "@/components/ui/Loader";
import { useToast, toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiRoute } from "@/utils/apiRoutes";

interface props {}

const Page: React.FC<props> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef(0);

  const verify = useCallback(async () => {
    const token = searchParams.get("token");
    const password = searchParams.get("password");
    if (!token) {
      toast({
        title: "Wrong Url",
        description: "Wrong url please try again...",
        variant: "destructive",
      });
      router.push("/");
      return;
    }

    const url = new URL(
      !!password ? apiRoute.verifyForgotPassword : apiRoute.verify
    );
    url.searchParams.set("token", token);
    console.log(url.href);

    const data = {
      token,
    };

    try {
      const resp = await axios.post(url.href, data, { withCredentials: true });
      if (resp.status === 200) {
        toast({
          title: "Email Verified Successfully",
        });
        if (!!password) {
          router.push("/forgot-password/change");
        } else router.push("/");
      } else {
        toast({
          title: "Error verifying Email try again",
          variant: "destructive",
        });
        // router.push("/");
      }
    } catch (error) {
      // Handle error appropriately
      console.error("Verification error:", error);
    }
  }, [router]);

  useEffect(() => {
    console.log("first", ++ref.current);
    verify();
  }, []);

  console.log("rerender");

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center gap-12 p-24">
      <h1 className="text-2xl  tracking-wide">Verifying email</h1>
      <Loader className=" h-12 w-12" />
    </div>
  );
};

export default Page;
