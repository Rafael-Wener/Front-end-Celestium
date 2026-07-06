'use client';

type SectionKey = 'produtos' | 'compras' | 'histórico' | 'relatórios';

interface AdminSidebarProps {
  selectedSection: SectionKey;
  onSelectSection: (section: SectionKey) => void;
}

const menuSections = [
  { key: 'produtos', label: 'Produtos' },
  { key: 'compras', label: 'Compras' },
  { key: 'histórico', label: 'Histórico' },
  { key: 'relatórios', label: 'Relatórios' },
] as const;

export default function AdminSidebar({ selectedSection, onSelectSection }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#07050c]/90 shadow-2xl shadow-black/40 overflow-y-auto">
      <div className="p-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Menu</p>
          <h2 className="mt-3 text-xl font-bold text-white">Navegação</h2>
        </div>

        <div className="space-y-3">
          {menuSections.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectSection(item.key as SectionKey)}
              className={`w-full rounded px-4 py-3 text-left text-sm font-semibold transition cursor-pointer ${
                selectedSection === item.key
                  ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/20'
                  : 'bg-white/5 text-slate-200 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Acesso rápido removido conforme solicitado */}
      </div>
    </aside>
  );
}
