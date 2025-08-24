"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Home, 
  Users,
  Building2,
  List,
  Send,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/themeToggle";

type MenuItem = {
  type: "link";
  href: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
} | {
  type: "heading";
  label: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      type: "link",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
      label: "Home",
      tooltip: "Return to dashboard homepage"
    },
    {
      type: "heading",
      label: "Prospect & Enrich"
    },
    {
      type: "link",
      href: "/dashboard/icps",
      icon: <Users className="h-4 w-4" />,
      label: "ICPs",
      tooltip: "Manage Ideal Customer Profiles"
    },
    {
      type: "link",
      href: "/dashboard/companies",
      icon: <Building2 className="h-4 w-4" />,
      label: "Companies",
      tooltip: "View and manage companies"
    },
    {
      type: "link",
      href: "/dashboard/peoples",
      icon: <Users className="h-4 w-4" />,
      label: "Peoples",
      tooltip: "Manage people contacts"
    },
    {
      type: "link",
      href: "/dashboard/lists",
      icon: <List className="h-4 w-4" />,
      label: "Lists",
      tooltip: "Manage contact lists"
    },
    {
      type: "heading",
      label: "Engage"
    },
    {
      type: "link",
      href: "/dashboard/campaigns",
      icon: <Send className="h-4 w-4" />,
      label: "Campaigns",
      tooltip: "Manage marketing campaigns"
    },
    {
      type: "link",
      href: "/dashboard/emails",
      icon: <Mail className="h-4 w-4" />,
      label: "Emails",
      tooltip: "View and send emails"
    }
  ];

  // Function to check if a link is active
  const isActive = (href: string) => {
    return pathname === href || 
           (href !== "/dashboard" && pathname?.startsWith(href));
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black bg-opacity-50" 
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
        <aside className="relative z-50 w-64 border-r p-4">
          <div className="flex justify-between items-center mb-6">
            <img src="/logo.png" alt="Fynelo Logo" className="h-8 w-auto" />
            <button 
              className="btn-primary"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              if (item.type === "heading") {
                return (
                  <div 
                    key={index} 
                    className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-4 mb-2 px-2"
                  >
                    {item.label}
                  </div>
                );
              } else {
                return (
                  <Link 
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isActive(item.href) 
                        ? "bg-primary/10 text-primary font-medium dark:bg-primary/20" 
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              }
            })}
          </nav>
        </aside>
      </div>

      {/* Desktop Sidebar (Always collapsed, expands on hover) */}
      <aside 
        className="hidden lg:flex lg:flex-col border-r p-4 
                   w-16 hover:w-64 transition-all duration-300 group"
      >
        <div className="flex items-center mb-6">
          <img src="/logoFavicon.png" alt="Fynelo Logo" className="h-8 w-auto" />
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            if (item.type === "heading") {
              return (
                <div 
                  key={index} 
                  className="hidden group-hover:block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-4 mb-2 px-2"
                >
                  {item.label}
                </div>
              );
            } else {
              return (
                <Tooltip key={index} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary font-medium dark:bg-primary/20"
                          : ""
                      }`}
                    >
                      {item.icon}
                      <span className="hidden group-hover:inline">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            }
          })}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between surface border-b px-6 py-3">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="text-lg heading-3">Welcome Dear user!</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 surface">{children}</main>
      </div>
    </div>
  );
}
