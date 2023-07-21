"use client";
import { themeModeSelector, toggleMode } from "@/lib/store/features/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React from "react";

const ThemeToggler = () => {
  const mode = useAppSelector((state) => themeModeSelector(state));
  const dispatch = useAppDispatch();

  return (
    <button
      className="hover:text-blue-500 duration-150"
      onClick={() => dispatch(toggleMode())}
      //   @click="darkMode = !darkMode"
    >
      {mode === "dark" ? (
        <SunIcon className="w-6" />
      ) : (
        <MoonIcon className="w-6" />
      )}
      {/* <i className="text-xl fa-regular fa-moon" x-show="darkMode"></i>
              <i className="text-xl fa-regular fa-sun" x-show="!darkMode"></i> */}
    </button>
  );
};

export default ThemeToggler;
