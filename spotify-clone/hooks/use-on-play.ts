import { Song } from "@/types";
import { usePlayer } from "@/hooks/use-player-store";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";

export const useOnPlay = (songs: Song[]) => {
  const { setIds, setId } = usePlayer();
  const { onOpen } = useModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return onOpen("auth");
    }

    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};
