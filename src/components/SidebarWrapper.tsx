"use client"; // ✅ Este componente pode usar usePathname()

import Sidebar from "@/components/SideBar";
import { usePathname } from "next/navigation";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const hideSidebar = pathname === "/" || pathname === "/cadastro";

  return !hideSidebar ? <Sidebar /> : null;
}
