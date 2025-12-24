import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Link2,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Aadhar",
    url: "/aadhar",
    icon: Home,
  },
  {
    title: "Ration Card Details",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Expense Tracker",
    url: "/expense-tracker",
    icon: Calendar,
  },
  {
    title: "Tools",
    url: "/tools",
    icon: Search,
  },
  {
    title: "Government Links",
    url: "/government-links",
    icon: Link2,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const [sidebarMenu, setSidebarMenu] = useState(items);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.admin) {
      setSidebarMenu([
        ...sidebarMenu,
        {
          title: "Admin",
          url: "/admin",
          icon: Link2,
        },
      ]);
    }
  }, [user]);

  // ---------------- Handler Functions ---------------------
  const handleSignout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenu.map((item) => {
                // if (item.title === "Admin") {
                //   console.log("itemTIl:", item.title);
                //   if (user.admin) {
                //   console.log("useradmin:", user.admin);

                //     <SidebarMenuItem key={item.title}>
                //       <SidebarMenuButton asChild>
                //         <Link to={item.url}>
                //           <item.icon />
                //           <span>{item.title}</span>
                //         </Link>
                //       </SidebarMenuButton>
                //     </SidebarMenuItem>;
                //   }
                //   return;
                // }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> akashgupta
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span onClick={handleSignout}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
