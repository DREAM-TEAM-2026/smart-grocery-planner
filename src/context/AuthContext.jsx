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
        if (result.data?.session && result.data?.user) {
          setSession(result.data.session);
          setUser(result.data.user);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/home',
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    setSession(null);
    setUser(null);
  };

  const UserContextValue = useMemo(() => {
    return {
      user,
      session,
      loading,
      handleSignOut,
      handleGoogleSignIn,
      setUser,
      setSession,
      setLoading,
    };
  }, [user, session, loading]);

  return (
    <AuthContext.Provider value={UserContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
