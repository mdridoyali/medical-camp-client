import { createContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import auth from "../../firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic()
  const googleProvider = new GoogleAuthProvider;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log( 'auth', user)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser?.email }
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token)
               setLoading(false);
            }
          })
      }
      else {
        localStorage.removeItem('access-token')
        setLoading(false);
      }


    });
    return () => {
      return unSubscribe();
    };
  }, [axiosPublic, user?.email]);

  const authInfo = {
    user,
    loading,
    createUser,
    logInUser,
    logOutUser,
    updateUserProfile,
    googleLogin

  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
