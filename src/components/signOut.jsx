import { getAuth, signOut } from 'firebase/auth';
import React from 'react';

const SignOut = () => {
  const auth = getAuth();

  return auth.currentUser && (
    <button className='logOut' onClick={() => signOut(auth)}>Log Out</button>
  );
};

export default SignOut;
