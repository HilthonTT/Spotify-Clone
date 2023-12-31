"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Song } from "@/types";
import { LikeButton } from "@/components/like-button";
import { MediaItem } from "@/components/media-item";
import { useUser } from "@/hooks/use-user";
import { useOnPlay } from "@/hooks/use-on-play";

interface LikedContentProps {
  songs: Song[];
}

export const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={onPlay} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
