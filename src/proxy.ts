import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // ĐỔI TÊN Ở ĐÂY CHO ĐÚNG VỚI BACKEND
  const token = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/register"];
  const isPublic = publicPaths.some((p) => path.startsWith(p));

  // chưa login + route private -> Về login
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // đã login mà vào login/register -> Chuyển vào home
  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|api).*)"],
};