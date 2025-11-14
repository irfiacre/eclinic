"use client";
import { PLACEHOLDER_IMG } from "@/constants/fixtures";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TopNav = ({ user, title }: { user: any; title: string }) => {
  const params: any = useParams();
  const [isActive, handleDropdown] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("Overview");

  const router = useRouter();

  const handleLogout = async () => {
    const result = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status == 200) {
      router.replace("/");
    }
  };

  useEffect(() => {
    const currentUrl = window.location.href.split("/");
    setCurrentTitle(
      params.id
        ? `${params.id?.substring(0, 20)}...`
        : currentUrl[currentUrl.length - 1]
        ? currentUrl[currentUrl.length - 1]
        : "overview"
    );
  }, [params]);

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-primary text-2xl capitalize">{currentTitle}</h1>
      <div className="mr-6 flex flex-row gap-3 items-center text-notificationIconColor">
        <div className="">
          <Icon icon="zondicons:notification" fontSize={20} />
        </div>
        <div>|</div>
        <div>
          <span>{user.firstName}</span> <span>{user.lastName}</span>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <div onClick={() => handleDropdown((prevState) => !prevState)}>
              <Image
                className="rounded-full cursor-pointer hover:border hover:border-borderColorLight"
                loader={() => user.photoUrl}
                src={user.photoUrl ? user.photoUrl : PLACEHOLDER_IMG}
                alt="Rounded avatar"
                height={40}
                width={40}
                unoptimized
              />
            </div>
            <div
              className={`${
                isActive ? "" : "hidden"
              } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-backgroundColor2"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
