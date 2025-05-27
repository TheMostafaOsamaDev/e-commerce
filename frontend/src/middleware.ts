import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware is running");

  return NextResponse.next();
}

// export const config = {
// 	matcher: ["/dashboard"], // Specify the routes the middleware applies to
// };
