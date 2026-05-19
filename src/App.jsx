import { useState, useEffect } from 'react';
import { authClient } from './auth';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';

import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  // Kode untuk testing development
  // const [jwtToken, setJwtToken] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const result = await authClient.getSession();

      if (result.data?.session && result.data?.user) {
        setSession(result.data.session);
        setUser(result.data.user);

        // Kode untuk testing development
        // const tokenResult = await authClient.token();
        // if (tokenResult.data) {
        //   setJwtToken(tokenResult.data.session.token);
        //   console.log(
        //     'Salin JWT Token ini untuk di Postman:',
        //     tokenResult.data.session.token,
        //   );
        // }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (session && user) {
    return (
      <UserProfile
        user={user}
        setSession={setSession}
        setUser={setUser}
        // jwtToken={jwtToken}
        // setJwtToken={setJwtToken}
      />
    );
  }

  return (
    <AuthForm
      setSession={setSession}
      setUser={setUser}
      // setJwtToken={setJwtToken}
    />
  );
}

export default App;
