import MerchantAdminNav from "@/components/MerchantAdminNav";
import NavBar from "@/components/NavBar";
import React from "react";
import { cookies } from "next/headers";



interface Props {
  children: React.ReactNode;
}



const Layout = ({ children }: Props) => {
  const cookieStore = cookies();
  const user = JSON.parse(cookieStore.get("user")?.value || "{}" );
  
  return (
    <div>
      <NavBar>
        <MerchantAdminNav isAdmin={user.role==="ADMIN"}/>
      </NavBar>
      <div className="p-24">{children}</div>
    </div>
  );
};


export default Layout;
