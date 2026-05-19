import { authClient } from '../auth';

function UserProfile({ user, setSession, setUser, jwtToken, setJwtToken }) {
  const handleSignOut = async () => {
    await authClient.signOut();
    setSession(null);
    setUser(null);

    // Kode untuk testing development
    // setJwtToken(null);
  };

  return (
    <div>
      <h1>Logged in as {user.email}</h1>

      {/* Kode untuk testing development */}
      {/* <p>
        JWT Token:{' '}
        <textarea readOnly value={jwtToken || ''} rows={4} cols={50} />
      </p> */}

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile;
