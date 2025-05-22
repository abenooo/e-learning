// utils/auth.ts Token storage 
export function setToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function clearToken() {
  localStorage.removeItem('accessToken');
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
