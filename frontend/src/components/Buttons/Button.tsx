import React from "react";

interface Props {
  children: React.ReactNode;
}

const Button = ({ children }: Props) => {
  return <button className="border rounded hover:bg-white hover:text-black">{children}</button>;
};

export default Button;
