'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'err'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = '/admin';
      } else {
        setState('err');
      }
    } catch {
      setState('err');
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-carbon px-5 text-bone">
      <form onSubmit={submit} className="w-full max-w-sm border border-bone/15 bg-carbon-2 p-8">
        <p className="tag text-ash">INTERNAL</p>
        <h1 className="mega mt-3 text-4xl">ADMIN</h1>

        <label className="tag mt-8 block text-ash" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field field--dark mt-2"
        />

        <button
          type="submit"
          disabled={state === 'loading'}
          className="mt-6 w-full bg-white px-6 py-4 stencil text-lg font-extrabold text-carbon transition-colors hover:bg-bone disabled:opacity-60"
        >
          {state === 'loading' ? 'CHECKING…' : 'ENTER'}
        </button>

        {state === 'err' && <p className="mt-4 text-sm text-papaya">Wrong password — try again.</p>}

        <a href="/" className="swipe mt-8 inline-block tag text-bone/50 hover:text-white">
          ← Back to site
        </a>
      </form>
    </main>
  );
}
