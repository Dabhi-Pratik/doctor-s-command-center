import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const pageHeaders: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Good Morning, Dr. Wilson", subtitle: "Here's your patient overview for today" },
  "/patients": { title: "Patient Records", subtitle: "Manage and view all patient information" },
  "/appointments": { title: "Appointments", subtitle: "Manage your schedule and patient appointments" },
  "/analytics": { title: "Analytics Dashboard", subtitle: "Track performance metrics and patient statistics" },
  "/notifications": { title: "Notifications", subtitle: "Stay updated with patient alerts and system messages" },
  "/settings": { title: "Settings", subtitle: "Manage your account and application preferences" },
};

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const header = pageHeaders[location.pathname] || pageHeaders["/"];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{header.title}</h1>
              <p className="text-muted-foreground">{header.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
