"use client";

import { useGetSongId } from "@/hooks/use-get-song-id.";
import { useLoadSongUrl } from "@/hooks/use-load-song-url";
import { usePlayer } from "@/hooks/use-player-store";

import { PlayerContent } from "@/components/player-content";

export const Player = () => {
  const { activeId } = usePlayer();
  const { song } = useGetSongId(activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
