// 페이지 전환시 인가된 사용자인지 판별 후 Redirect 시켜주는 용도

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.rewrite(req.nextUrl);
}

// import { NextRequest, NextResponse } from 'next/server';

// import { COOKIE_KEY, PATH, AUTH_PATH, NON_AUTH_PATH } from '@/constants';

// export function middleware(req: NextRequest) {
//   const { pathname, origin } = req.nextUrl;
//   const cookie = req.cookies.get(COOKIE_KEY) ? JSON.parse(req.cookies.get(COOKIE_KEY)!) : null;

//   const isAuthPath = (path: string) =>
//     Object.values(AUTH_PATH).find((p) => path !== '/' && path.includes(p));
//   const isNonAuthPath = (path: string) =>
//     Object.values(NON_AUTH_PATH).find((p) => path !== '/' && path.includes(p));

//   if (pathname) {
//     if (!cookie && isAuthPath(pathname)) {
//       const response = NextResponse.redirect(`${origin}${PATH.login}`);
//       response.headers.set('x-middleware-cache', 'no-cache');
//       return response;
//     }
//     if (cookie && isNonAuthPath(pathname)) {
//       return NextResponse.redirect(`${origin}${PATH.root}`);
//     }
//   }

//   return NextResponse.rewrite(req.nextUrl);
// }
