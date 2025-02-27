import { NextRequest, NextResponse } from "next/server";
import { axiosBase } from "./lib/api";
import { USER_DATA_COOKIE_NAME } from "./config";

export default async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value;
  const { pathname, origin } = request.nextUrl;
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";

  try {
    if (authToken) {
      const res = await axiosBase.post(
        "/auth/verify",
        {},
        {
          headers: {
            auth_token: `${authToken}`,
          },
        }
      );
      const data = res.data;

      if (data && isAuthRoute) {
        return NextResponse.redirect(new URL("/", origin));
      }

      // Encrypt Data
      const encryptedRes = await fetch(`${origin}/api/encrypt`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is OK
      if (!encryptedRes.ok) {
        console.error("Failed to encrypt data:", encryptedRes.statusText);
        return NextResponse.next({});
      }

      // Parse the response as JSON
      const encryptedData = await encryptedRes.json();

      if (encryptedData.encryptedData) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set(USER_DATA_COOKIE_NAME, encryptedData.encryptedData);

        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        response.cookies.set({
          name: USER_DATA_COOKIE_NAME,
          value: encryptedData.encryptedData,
        });

        return response;
      }
    }
  } catch (error) {
    // Delete cookies
    const response = NextResponse.next({});

    response.cookies.delete("auth_token");
    response.cookies.delete(USER_DATA_COOKIE_NAME);

    return response;
  }

  return NextResponse.next({});
}

export const config = {
  matcher: ["/", "/sign-up", "/sign-in"],
};
