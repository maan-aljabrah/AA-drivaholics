const KEY = 'dh_intro_seen';

export function shouldSkipIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    // storage blocked: the intro just plays again next visit
  }
}
