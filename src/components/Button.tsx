import React from "react";

export default function Button({
  name,
  children,
}: Readonly<{
  name: string;
  children?: React.ReactNode;
}>) {
  return (
    <button className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded">
      {name ? name : children}
    </button>
  );
}
