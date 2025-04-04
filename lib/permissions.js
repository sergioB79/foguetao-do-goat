import { getUser } from './auth';

export function isAdmin() {
  const user = getUser();
  return user?.role === 'admin';
}

export function isUser() {
  const user = getUser();
  return user?.role === 'user';
}
