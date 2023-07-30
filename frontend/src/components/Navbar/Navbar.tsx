"use client";
import Link from "next/link";
import React from "react";
import Hamburger from "../Buttons/Hamburger";
// import {} from "her"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import ThemeToggler from "../Buttons/ThemeToggler";
import MobileMenu from "./MobileMenu";
import { useAppSelector } from "@/lib/store/store";
import { userSelector } from "@/lib/store/features/userSice";
import UserPanel from "./UserPanel";

interface Props {
  //   children: React.ReactNode;
}

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) =>
    userSelector(state)
  );
  const links = [
    { title: "Blog", href: "/blog" },
    { title: "Apps", href: "/apps" },
    { title: "Snippets", href: "/snippets" },
    { title: "CV", href: "/cv" },
  ];

  return (
    <nav className="relative w-full h-16 flex items-center md:justify-center px-6 shadow-md z-10 text-gray-700 dark:text-gray-200">
      <div className="flex justify-between items-center w-full lg:w-4/5">
        <Link className="text-xl font-semibold" href="/">
          Devster
        </Link>
        <div
          className="w-full md:ml-6 lg:ml-20 md:gap-20 md:items-center hidden lg:flex md:flex-row"
          //   :className="active ? 'absolute top-16 left-0 flex flex-col divide-y bg-white dark:bg-zinc-800 shadow-md' : 'hidden md:flex'"
        >
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="py-4 px-4 flex items-center font-semibold hover:text-blue-500"
              // className=""
            >
              {link.title}
            </Link>
          ))}

          <div className="py-4 px-4 flex items-center gap-8 font-semibold md:ml-auto">
            {/* search bar */}
            {/* <div className="w-48 h-8 bg-gray-200 dark:bg-gray-600 rounded shadow border border-gray-600 dark:border-gray-200"></div> */}
            <UserPanel />
            <ThemeToggler />
          </div>
        </div>
        <div className="lg:hidden ml-auto flex items-center">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
