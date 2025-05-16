import { ReactNode } from "react";
import { TodoProvider } from "@/app/_context/TodoContext/TodoProvider";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <TodoProvider>{children}</TodoProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
