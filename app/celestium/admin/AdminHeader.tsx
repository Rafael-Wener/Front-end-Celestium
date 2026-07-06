'use client';

import Image from 'next/image';

export default function AdminHeader() {
  return (
    <div className="flex items-center gap-4">
      <Image className="rounded-md" src="/logoCeslestiumtrue.png" alt="Celestium" width={56} height={56} />
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Celestium</p>
        <h1 className="text-3xl font-bold text-white">Admin</h1>
      </div>
    </div>
  );
}
