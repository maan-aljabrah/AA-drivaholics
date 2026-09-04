'use client';

export default function AdminLogout() {
  const logout = async () => {
    await fetch('/api/admin-login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  return (
    <button type="button" onClick={logout} className="swipe tag text-bone/60 hover:text-white">
      Log out
    </button>
  );
}
