// // import { NextRequest, NextResponse } from "next/server";
// import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

// // export function middleware(request: NextRequest) {
// //   console.log("middleware: " + request.url);

// //   return NextResponse.next();
// // }

// // export const config = {};

// export const middleware = createNextAuthMiddleware();

// export const config = {
//   matcher: ["/(.*)"],
// };

import { NextRequest, NextResponse } from "next/server";
import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

// Basic認証を行うためのミドルウェアをライブラリから生成します
const basicAuthMiddleware = createNextAuthMiddleware();

// サイト全体で実行されるメインのミドルウェア関数を定義します
export function middleware(request: NextRequest) {
  // ここで独自に行いたい処理（今回はコンソールへのログ出力）を実行します
  console.log("middleware: " + request.url);

  // 次に、生成しておいたBasic認証ミドルウェアを呼び出します。
  return basicAuthMiddleware(request);
}

// ミドルウェアを適用するパスを指定する設定オブジェクトを定義します
export const config = {
  /*
   * 修正点: matcherをより厳密に設定します。
   * これにより、APIルート、Next.jsの内部ファイル(_next/static, _next/image)、
   * favicon.ico、および画像ファイルなど、拡張子を持つファイルへのリクエストは
   * ミドルウェアの対象外となり、Basic認証がかからなくなります。
   * これが404エラーを防ぐための重要な設定です。
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
