import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/Auth/authServices";

// Define route groups
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/api/auth",
  "/dashboard/menu/all-menu",
];
const mealProviderRoutes = [
  "/dashboard/order/meal-provider-order",
  "/dashboard",
  "/dashboard/menu/create-menu",
  "/dashboard/menu/my-menu",
  "/dashboard/menu/update-menu",
  "/dashboard/meal-provider/my-meal-provider",
  "/dashboard/meal-provider/update-meal-provider",
  "/dashboard/menu/all-menu",
  "/dashboard/order/my-order",
];
const customerRoutes = [
  "/create-meal-provider",
  "/dashboard",
  "/dashboard/order/my-order",
  "/dashboard/menu/all-menu",
];
const profileRoutes = [
  "/dashboard/user/view-profile",
  "/dashboard/user/update-profile",
  "/dashboard/user/change-password",
];
const authRoutes = ["/login", "/signup"];
const staticPaths = ["/_next/", "/favicon.ico", "/assets/"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // 1. Allow static files and API routes
  if (
    staticPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Allow all public routes and dynamic public paths
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/details-menu/") ||
    pathname.startsWith("/reset-ui")
  ) {
    return NextResponse.next();
  }

  // 3. Get authenticated user
  const userInfo = await getCurrentUser();

  if (!userInfo) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectPath", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Block authenticated users from accessing login/signup
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 5. Role-based route protection
  if (userInfo.role === "mealProvider") {
    if (
      mealProviderRoutes.includes(pathname) ||
      profileRoutes.includes(pathname) ||
      pathname.startsWith("/dashboard/order/details-menu/") ||
      pathname.startsWith("/dashboard/order/order-details/")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (userInfo.role === "customer") {
    if (
      customerRoutes.includes(pathname) ||
      profileRoutes.includes(pathname) ||
      pathname.startsWith("/dashboard/order/details-menu/") ||
      pathname.startsWith("/dashboard/order/order-details/")
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default allow
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/create-meal-provider",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
