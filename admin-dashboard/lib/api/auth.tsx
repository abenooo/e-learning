// utils/api/auth.ts

export async function login(email: string, password: string) {
  const res = await fetch('https://e-learning-mern-stack.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Login failed');
  }

  // Store tokens and user in localStorage
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data; // includes accessToken, refreshToken, and user
}
