import NavbarAdmin from "./AdminNavbar";
import SidebarAdmin from "./AdminSidebar";
import CriarProduto from "./AdminUserLabel";


export default function AdminDashboard() {
  return (

    <div className="flex h-screen w-full overflow-hidden bg-[#0a0516]">
      <SidebarAdmin />
      <div className="flex flex-1 flex-col overflow-hidden">
        <NavbarAdmin />
        <main className="flex-1 overflow-y-auto p-8 layout-scrollbar">
          <CriarProduto />
        </main>
      </div>
    </div>
  );
}