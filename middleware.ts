import { getToken } from "./utils/token";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken();
  if (!token) {
    const newUrl = new URL("/login/dummyjson", request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/dummyjson/current"],
};
