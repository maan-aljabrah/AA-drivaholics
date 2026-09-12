'use client';

import { useState } from 'react';

export default function DeleteButton({ endpoint, label }: { endpoint: string; label: string }) {
  const [busy, setBusy] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(endpoint, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    } else {
      alert('Failed to delete. Try again.');
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={busy}
      aria-label={`Delete ${label}`}
      className="font-mono text-xs text-bone/40 transition-colors hover:text-papaya disabled:opacity-40"
    >
      {busy ? '…' : 'DELETE'}
    </button>
  );
}
