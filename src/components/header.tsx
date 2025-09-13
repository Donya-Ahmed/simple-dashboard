import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Typography } from "./ui/typography";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-sidebar sticky top-0 z-50 flex justify-between items-center  px-6 h-16">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>{location.pathname.split("/")[1]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DropdownMenu>
        <div className="flex items-center gap-2  outline-none w-[150px] justify-between">
          <div className="flex items-center gap-2  outline-none">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt="Evano" />
              <AvatarFallback>
                <User className="text-gray-500" size={16} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <Typography variant="p">Admin</Typography>
            </div>
          </div>
          <DropdownMenuTrigger className="cursor-pointer ">
            <ChevronDown className="w-4 h-4 text-white" />
          </DropdownMenuTrigger>
        </div>

        <DropdownMenuContent className="w-40 mt-2">
          <DropdownMenuItem onClick={logout} className="cursor-pointer">
            <LogOut className="w-4 h-4 mr-2 text-red-500" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
