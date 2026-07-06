'use client';

type User = {
  id: string;
  nickname: string;
  email: string;
};

interface AdminUserLabelProps {
  user: User | null;
  onLogout: () => void;
}

export default function AdminUserLabel({ user, onLogout }: AdminUserLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-200">
        Admin
      </div>
      <div className="rounded border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <p className="font-semibold text-white">{user?.nickname ?? 'Carregando...'}</p>
        <p className="text-xs text-slate-400">{user?.email ?? 'Buscando dados...'}</p>
      </div>
      <button
        onClick={onLogout}
        className="rounded bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500 cursor-pointer"
      >
        Sair
      </button>
    </div>
  );
}
