import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt_token')?.value;

  // Danh sách các route cần đăng nhập mới được vào
  const protectedPaths = ['/profile', '/bookmarks', '/settings'];
  const isProtectedPath = protectedPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    // Nếu chưa đăng nhập, đá về trang /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu user đã đăng nhập mà cố vào trang login, đá về trang chủ
  if (request.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
// Chỉ chạy middleware cho các route cần thiết (Tối ưu hiệu suất)
export const config = {
  matcher: ['/profile/:path*', '/bookmarks', '/settings', '/login'],
};