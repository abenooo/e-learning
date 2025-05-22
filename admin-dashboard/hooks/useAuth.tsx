"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { getToken } from '@/lib/auth';
//protect the /dashboard page
export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return { isAuthenticated };
}
