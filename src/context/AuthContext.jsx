import { createContext, useState, useEffect, useMemo } from 'react';
import { authClient } from '../auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const result = await authClient.getSession();
        setSession(result);
        setUser(result?.user);
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const UserContextValue = useMemo(() => {
    return { user, session, loading };
  }, [user, session, loading]);

  return (
    <AuthContext.Provider value={UserContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
