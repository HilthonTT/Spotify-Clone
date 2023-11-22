"use client";

import { Song } from "@/types";

import { MediaItem } from "@/components/media-item";
import { LikeButton } from "@/components/like-button";
import { useOnPlay } from "@/hooks/use-on-play";

interface SearchContentProps {
  songs: Song[];
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={song} onClick={onPlay} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
