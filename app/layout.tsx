"use client";
import { Providers } from "../components/Providers";
import toast, { Toaster } from "react-hot-toast";
import { MyContextProvider } from "../context/MyContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <MyContextProvider>
          <Providers>{children}</Providers>
          {/* {children} */}
          <Toaster />
        </MyContextProvider>
      </body>
    </html>
  );
}
