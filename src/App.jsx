import { useState, useEffect } from 'react';
import { authClient } from './auth';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';

import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const result = await authClient.getSession();

      if (result.data?.session && result.data?.user) {
        setSession(result.data.session);
        setUser(result.data.user);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (session && user) {
    return (
      <UserProfile user={user} setSession={setSession} setUser={setUser} />
    );
  }

  return <AuthForm setSession={setSession} setUser={setUser} />;
}

export default App;
