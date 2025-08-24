import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/provider/ThemeProvider";

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
      <body 
        className="min-h-screen font-sans antialiased transition-colors duration-200 ease-in-out"
        style={{
          // Using exact CSS variables from your globals.css
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-family-sans)',
        } as React.CSSProperties}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main style={{
            backgroundColor: 'var(--color-background)',
            minHeight: '100vh'
          }}>
            {children}
          </main>
          
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'var(--color-background)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-md)',
                boxShadow: 'var(--shadow-lg)',
                fontSize: 'var(--font-size-sm)',
                padding: 'var(--spacing-4)',
                fontFamily: 'var(--font-family-sans)',
              },
            }}
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}