import { Song } from "@/types";
import { usePlayer } from "@/hooks/use-player-store";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@/hooks/use-user";

export const useOnPlay = (songs: Song[]) => {
  const { setIds, setId } = usePlayer();
  const { onOpen } = useModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return onOpen("auth");
    }

    if (!subscription) {
      return onOpen("subscribe");
    }

    setId(id);
    setIds(songs.map((song) => song.id));
  };

  return onPlay;
};
