import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthStatus } from '@/api/auth/authAPI';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string } | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ['authStatus'],
    queryFn: fetchAuthStatus,
    retry: false,
  });

  const authValue = {
    isAuthenticated: data?.isAuthenticated ?? false,
    user: data?.user ?? null,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
