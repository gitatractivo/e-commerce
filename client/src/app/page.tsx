'use client'
import NavBar from "@/components/NavBar";
import Carousel from "@/components/home/Carousel";
import Image from "next/image";
import { BASE_URL } from "@/utils/base";
import { apiRoute } from "@/utils/apiRoutes";
export default function Home() {
  
  
  return (
    <div className="flex  min-h-screen h-[5vh] flex-col items-center justify-between p-24 ">
      <NavBar className="">{"user routes"}</NavBar>
      

      <Carousel />
    </div>
  );
}
