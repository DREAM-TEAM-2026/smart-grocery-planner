import { authClient } from '../auth';

function UserProfile({ user, setSession, setUser }) {
  const handleSignOut = async () => {
    await authClient.signOut();
    setSession(null);
    setUser(null);
  };

  return (
    <div>
      <h1>Logged in as {user.email}</h1>

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile;
