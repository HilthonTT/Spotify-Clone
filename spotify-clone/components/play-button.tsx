"use client";

import { FaPlay } from "react-icons/fa";

export const PlayButton = () => {
  return (
    <button
      className="transition opacity-0 rounded-full flex group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110
         items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4">
      <FaPlay className="text-black" />
    </button>
  );
};
