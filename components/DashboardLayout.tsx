import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6faf5]">
      <Sidebar />
      <main className="min-h-screen lg:pl-[290px]">
        <Topbar />
        <div className="p-5 lg:p-8">{children}</div>
      </main>
    </div>
  );
}


