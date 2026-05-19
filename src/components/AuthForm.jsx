import { useState } from 'react';
import { authClient } from '../auth';

function AuthForm({ setSession, setUser, setJwtToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = isSignUp
      ? await authClient.signUp.email({
          name: email.split('@')[0] || 'User',
          email,
          password,
        })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const sessionResult = await authClient.getSession();
    if (sessionResult.data?.session && sessionResult.data?.user) {
      setSession(sessionResult.data.session);
      setUser(sessionResult.data.user);

      if (isSignUp) {
        try {
          const tokenResult = await authClient.token();
          const jwtToken =
            tokenResult.data?.session?.token || tokenResult.data?.token;

          const backendResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
          });

          if (!backendResponse.ok) {
            console.error('Gagal menyimpan ID user ke backend lokal');
          } else {
            console.log('User ID berhasil disimpan di backend lokal!');
          }
        } catch (syncError) {
          console.error(
            'Terjadi masalah jaringan saat menghubungi backend:',
            syncError,
          );
        }
      }
    }

    // Kode untuk testing development
    // const tokenResult = await authClient.token();
    // if (tokenResult.data) {
    //   setJwtToken(tokenResult.data.session.token);
    //   console.log(
    //     'Salin JWT Token ini untuk di Postman:',
    //     tokenResult.data.session.token,
    //   );
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      <p>
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(false);
              }}
            >
              Sign in
            </a>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(true);
              }}
            >
              Sign up
            </a>
          </>
        )}
      </p>
    </form>
  );
}

export default AuthForm;
