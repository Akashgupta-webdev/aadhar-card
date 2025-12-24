import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router-dom";
import { IndianRupee } from "lucide-react";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex justify-between pr-4">
          <SidebarTrigger />
          <div className="flex gap-0.5 items-center">
            <span className="hidden sm:inline">Your Balance:</span>
            {/* <div className="flex items-center"> */}
              <IndianRupee className="w-3.5" />
              <span>0</span>
            {/* </div> */}
          </div>
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
