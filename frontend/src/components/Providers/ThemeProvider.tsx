"use client";
import { setMode, themeModeSelector } from "@/lib/store/features/themeSlice";
import loadFromLocalstorage from "@/lib/store/loadFromLocalStorage";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const mode = useAppSelector((state) => themeModeSelector(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mode = loadFromLocalstorage("theme", "light");
    console.log(mode);

    dispatch(setMode(mode));
  }, []);

  return (
    <html lang="en" className={mode === "dark" ? "dark" : ""}>
      {children}
    </html>
  );
};

export default ThemeProvider;
