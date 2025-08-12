"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Mobile Overlay) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
        <aside className="relative z-50 w-64 bg-white border-r p-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold">Fynelo</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
              Home
            </Link>
            <Link href="/dashboard/icps" className="block p-2 rounded hover:bg-gray-100">
              ICPs (Ideal customer profiles)
            </Link>
            <Link href="/dashboard/companies" className="block p-2 rounded hover:bg-gray-100">
              Companies
            </Link>
            <Link href="/dashboard/peoples" className="block p-2 rounded hover:bg-gray-100">
              Peoples
            </Link>
            <Link href="/dashboard/peoples" className="block p-2 rounded hover:bg-gray-100">
              Leads
            </Link>
          </nav>
        </aside>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r p-4">
        <div className="text-xl font-bold mb-6">Fynelo</div>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-100">
            Home
          </Link>
          <Link href="/dashboard/icp" className="block p-2 rounded hover:bg-gray-100">
            ICPs (Ideal customer profiles)
          </Link>
          <Link href="/dashboard/reports" className="block p-2 rounded hover:bg-gray-100">
            Companies
          </Link>
           <Link href="/dashboard/peoples" className="block p-2 rounded hover:bg-gray-100">
              Peoples
            </Link>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white border-b px-6 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="text-lg font-semibold">Welcome Dear user !</span>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
