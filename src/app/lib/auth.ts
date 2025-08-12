// Simple admin authentication system
// In production, use proper JWT tokens, hashed passwords, and database storage

export interface AdminUser {
  username: string;
  role: 'admin';
}

// Static admin credentials (in production, these should be in environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'bytesflux2024'
};

export const authenticateAdmin = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('admin_authenticated') === 'true';
};

export const loginAdmin = (username: string, password: string): boolean => {
  if (authenticateAdmin(username, password)) {
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_username', username);
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem('admin_authenticated');
  localStorage.removeItem('admin_username');
};

export const getAdminUsername = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_username');
}; 