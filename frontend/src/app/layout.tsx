// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en">
      <body suppressHydrationWarning className="bg-gray-50 text-gray-900">
        <main>{children}</main>
         <Toaster position="top-center"/>
      </body>
    </html>
  );
}
