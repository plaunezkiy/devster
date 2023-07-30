"use client";
import {
  ThemeModes,
  setMode,
  themeModeSelector,
} from "@/lib/store/features/themeSlice";
import loadFromLocalstorage from "@/lib/store/loadFromLocalstorage";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const mode = useAppSelector((state) => themeModeSelector(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setMode(
        loadFromLocalstorage("theme", "light") === "light"
          ? ThemeModes.Light
          : ThemeModes.Dark
      )
    );
  }, []);

  return (
    <html lang="en" className={mode === "dark" ? "dark" : ""}>
      {children}
    </html>
  );
};

export default ThemeProvider;
