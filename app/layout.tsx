import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "@/globals.css";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "@/components/organisms/Header/index";
import SideBar from "@/components/organisms/SideBar/index";
import { NextAuthProvider } from "@/lib/next-auth/provider";
import { getServerSession } from "next-auth/next";
import { options } from "@/lib/next-auth/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "アンケート 管理画面",
  description: "Questionnaire Admin App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const user = session?.user;

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AppRouterCacheProvider>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <Header />
              {user && <SideBar />}
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {children}
              </Box>
            </Box>
          </AppRouterCacheProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
