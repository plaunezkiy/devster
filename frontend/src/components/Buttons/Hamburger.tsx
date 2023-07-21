"use client";
import React, { useState } from "react";

const Hamburger = ({
  active,
  toggle,
}: {
  active: boolean;
  toggle: () => void;
}) => {
  const bar =
    "h-1 w-8 rounded-full bg-black dark:bg-gray-200 transition ease transform duration-300";

  return (
    <button
      className="flex flex-col gap-1 h-8 w-12 justify-center items-center"
      onClick={toggle}
    >
      <div
        className={`${bar} ${active ? "rotate-45 translate-y-2" : ""}`}
      ></div>
      <div
        // className="h-1 w-8 rounded-full bg-black dark:bg-gray-200 transition ease transform duration-300"
        //   :className="active ? "
        className={`${bar} ${active ? "opacity-0" : "opacity-100"}`}
      ></div>
      <div
        // className="h-1 w-8 rounded-full bg-black dark:bg-gray-200 transition ease transform duration-300"
        //   :className="active ? '-rotate-45 -translate-y-2' : ''"
        className={`${bar} ${active ? "-rotate-45 -translate-y-2" : ""}`}
      ></div>
    </button>
  );
};

Hamburger.propTypes = {};

export default Hamburger;
