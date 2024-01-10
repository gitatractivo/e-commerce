import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useToast, toast } from "@/components/ui/use-toast";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get("user");

  console.log("usercookie", cookie);
  if (!cookie || !cookie.value) {
    console.log("usercookie");

    return NextResponse.redirect(new URL("/login", request.url));
  }
  // console.log("cookie", cookie?.value);

  const user = JSON?.parse(cookie?.value as string);

  // const user = cookie?.value ;
  if (user.role === "USER") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //TODO: admin
  if (pathname.includes("/admin")) {
    if (user.role === "MERCHANT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (user.role === "USER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = { matcher: ["/dashboard:page"] };
