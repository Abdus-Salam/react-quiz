import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

// custom hooks
// using useAuth, can use signup, signin, logout function from anywhere
export function useAuth() {
  return useContext(AuthContext);
}
// ./ ends custom hooks

// Auth provider
export function AuthProvider({ children }) {
  // local state
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  // listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  });

  // for signup
  // it is asynchronous task. because, firebase hits request to backend
  async function signup(email, password, username) {
    const auth = getAuth();
    // call when login state
    await createUserWithEmailAndPassword(auth, email, password);

    // profile update in firebase
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    // update username in application/ react
    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  }

  // login function
  function login(email, password) {
    const auth = getAuth();
    // return a promise
    return signInWithEmailAndPassword(auth, email, password);
  }

  //logout function
  function logout() {
    const auth = getAuth();
    // return a promise
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  // return global Auth provider
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
