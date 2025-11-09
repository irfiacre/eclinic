"use client";
import LogoComponent from "@/src/components/logo/LogoComponent";
import React, { useState } from "react";
import { MenuItem } from "./MenuSection";

export const Sidebar = () => {
  const sidebarMenu = {
    dashboard: [
      {
        title: "Cases",
        subtitle: "All Cases",
        url: "cases",
        icon: "material-symbols:dashboard-rounded",
      },
    ],
    exams: [
      {
        title: "Nurses",
        subtitle: "Manage nurses",
        url: "nurses",
        icon: "mingcute:nurse-fill",
      },
    ],
  };
  const [searchText, setSearchText] = useState("");

  const handleSidebarSearch = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };
  return (
    <div className="px-6 py-9 border border-r-sidebarBorderColor h-lvh flex flex-col gap-6">
      <div>
        <LogoComponent />
      </div>
      <div>
        <MenuItem content={sidebarMenu.dashboard[0]} />
      </div>
      <div>
        <MenuItem content={sidebarMenu.exams[0]} />
      </div>
    </div>
  );
};
