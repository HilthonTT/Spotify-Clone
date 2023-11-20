import { getSongsUserId } from "@/actions/get-songs-user-id";
import { Sidebar } from "@/components/sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const userSongs = await getSongsUserId();

  return (
    <div className="h-full w-full">
      <Sidebar songs={userSongs}>{children}</Sidebar>
    </div>
  );
};

export default MainLayout;
