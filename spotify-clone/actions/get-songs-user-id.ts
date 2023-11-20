import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";

export const getSongsUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log("[GET_SONGS_USER_ID_SESSION]", sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData?.session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("[GET_SONGS_USER_ID]", error);
  }

  return (data as Song[]) || [];
};
