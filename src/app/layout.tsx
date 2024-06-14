import Navbar from "@/components/core/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management Tool",
  description: "A tool for project management and much more built using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
