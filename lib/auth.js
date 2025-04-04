export function isBrowser() {
  return typeof window !== 'undefined';
}

export function getUser() {
  if (!isBrowser()) return null;
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
}
