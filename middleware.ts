import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // callbacks.authorizedがtrueの場合のみ進入できる
    // console.log("in middlewareHeader: ", req.nextauth.token);
  },
  {
    callbacks: {
      // 認可に関する処理。ロールが `admin` ならOK
      authorized: ({ token }) => {
        // console.log("in authorized: ", token);
        return token?.role === 1;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!register|api|login).*)"],
};
