import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js App with Login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
