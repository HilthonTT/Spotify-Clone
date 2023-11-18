import { Sidebar } from "@/components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default MainLayout;
