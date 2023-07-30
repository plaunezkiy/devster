"use client";
import useFetch from "@/lib/hooks/useFetch";
import { fetchUser, setUser, userSelector } from "@/lib/store/features/userSice";
import loadFromLocalstorage from "@/lib/store/loadFromLocalstorage";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import Link from "next/link";
import { useEffect } from "react";

const UserPanel = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) =>
    userSelector(state)
  );
  const { _fetch } = useFetch();

  useEffect(() => {
    dispatch(setUser(JSON.parse(loadFromLocalstorage("user", "{}"))));
    dispatch(fetchUser());
  }, []);

  return isAuthenticated ? (
    <p>
      {user.first_name} {user.last_name}
    </p>
  ) : (
    <>
      <Link href="/login">Login</Link>
      <Link href="/signup">Sign Up</Link>
    </>
  );
};

export default UserPanel;
