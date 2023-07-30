"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggler from "../Buttons/ThemeToggler";
import Hamburger from "../Buttons/Hamburger";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { useAppSelector } from "@/lib/store/store";
import { userSelector } from "@/lib/store/features/userSice";

const variants = {
  open: { opacity: 1, y: "0" },
  closed: { opacity: 1, y: "-150%" },
};

const MobileMenu = () => {
  const { isAuthenticated, user } = useAppSelector((state) =>
    userSelector(state)
  );
  const menuRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const links = [
    { title: "Blog", href: "/blog" },
    { title: "Apps", href: "/apps" },
    { title: "Snippets", href: "/snippets" },
    { title: "CV", href: "/cv" },
  ];
  useClickOutside(menuRef, () => setOpen(false));

  return (
    <div
      className="w-full lg:hidden"
      ref={menuRef}
      //   :className="active ? 'absolute top-16 left-0 flex flex-col divide-y bg-white dark:bg-zinc-800 shadow-md' : 'hidden md:flex'"
    >
      <Hamburger active={open} toggle={() => setOpen(!open)} />

      <motion.div
        animate={open ? "open" : "closed"}
        variants={variants}
        className="absolute left-0 top-16 px-2 grid grid-cols-2 gap-2 w-full bg-white dark:bg-zinc-800 duration-300"
      >
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="w-full p-4 flex items-center justify-center font-semibold border rounded shadow hover:text-blue-500 hover:border-blue-500 hover:shadow-lg"
            onClick={() => setOpen(false)}
            // className=""
          >
            {link.title}
          </Link>
        ))}

        <div className="col-span-2 py-4 px-4 flex justify-between items-center gap-8 font-semibold w-full">
          {/* search bar */}
          {/* <div className="w-48 h-8 bg-gray-200 dark:bg-gray-600 rounded shadow border border-gray-600 dark:border-gray-200"></div> */}
          {isAuthenticated ? (
            <p>{user.first_name}</p>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
          <ThemeToggler />
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
