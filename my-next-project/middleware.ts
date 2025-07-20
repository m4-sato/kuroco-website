// import { NextRequest, NextResponse } from "next/server";
import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

// export function middleware(request: NextRequest) {
//   console.log("middleware: " + request.url);

//   return NextResponse.next();
// }

// export const config = {};

export const middleware = createNextAuthMiddleware();

export const config = {
  matcher: ["/(.*)"],
};
