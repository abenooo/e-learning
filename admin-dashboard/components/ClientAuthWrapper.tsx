// components/ClientAuthWrapper.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return <>{children}</>;
}
