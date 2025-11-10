"use client";
import LogoComponent from "@/src/components/logo/LogoComponent";
import React, { useEffect, useState } from "react";
import { MenuItem } from "./MenuSection";
import { extractInformationFromToken } from "@/util/helpers";

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
    nurses: [
      {
        title: "Nurses",
        subtitle: "Manage nurses",
        url: "nurses",
        icon: "mingcute:nurse-fill",
      },
    ],
  };
  const [userRole, setUserRole] = useState<string>("nurse");

  useEffect(() => {
    (async () => {
      const information: any = await extractInformationFromToken();
      if (information?.nurse) {
        setUserRole(information.nurse.role);
      }
    })();
  }, []);

  return (
    <div className="px-6 py-9 border border-r-sidebarBorderColor h-lvh flex flex-col gap-6">
      <div>
        <LogoComponent />
      </div>
      <div>
        <MenuItem content={sidebarMenu.dashboard[0]} />
      </div>
      {userRole !== "nurse" && (
        <div>
          <MenuItem content={sidebarMenu.nurses[0]} />
        </div>
      )}
    </div>
  );
};
