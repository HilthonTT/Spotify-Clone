"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";
import { useOnPlay } from "@/hooks/use-on-play";
import { MediaItem } from "@/components/media-item";

interface LibraryProps {
  songs: Song[];
}

export const Library = ({ songs }: LibraryProps) => {
  const { onOpen } = useModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return onOpen("auth");
    }

    // TODO: Check for subscription

    return onOpen("upload");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 text-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem onClick={onPlay} key={song.id} data={song} />
        ))}
      </div>
    </div>
  );
};
