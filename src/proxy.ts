import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value || request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  // nếu là trang chủ thì được vào mà không cần đăng nhập
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // nếu không có token và không phải trang login/register thì redirect về login
  if (!token) {
    if (isAuthPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // nếu có token mà vào trang login/register thì redirect về home
  if (token) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Loại bỏ các file tĩnh và hệ thống để tránh redirect nhầm file CSS/JS/Ảnh
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
