"use client";

const loadFromLocalstorage = (sliceName: string, default_val: string) => {
  return typeof window !== "undefined"
    ? localStorage.getItem(sliceName) || default_val
    : default_val;
};

export default loadFromLocalstorage;
