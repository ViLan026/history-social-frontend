import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value || request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. ƯU TIÊN TRANG CHỦ: Luôn cho vào trang chủ, không cần kiểm tra token hay gì cả
  if (pathname === "/") {
    return NextResponse.next();
  }

  // 2. Xác định các trang Public khác (Login/Register)
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // 3. Nếu CHƯA ĐĂNG NHẬP
  if (!token) {
    // Nếu vào trang login/register thì cho qua, các trang khác (Private) đá về /login
    if (isAuthPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Nếu ĐÃ ĐĂNG NHẬP
  if (token) {
    // Nếu cố vào lại login/register thì đẩy về trang chủ để tránh login lại
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Cho phép đi tiếp vào các trang private (dashboard, profile...)
  return NextResponse.next();
}

export const config = {
  // Loại bỏ các file tĩnh và hệ thống để tránh redirect nhầm file CSS/JS/Ảnh
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
