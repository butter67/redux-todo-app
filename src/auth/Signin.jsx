import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

import { login, updateUserProfile } from "../feature/usersSlice";

export const Signin = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const isLoginHandler = () => {
    setIsLogin(!isLogin);
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.uid);
        user.displayName = username;

        updateProfile(auth.currentUser, {
          displayName: username,
          uid: user.uid,
          num: 0,
        })
          .then(() => {
            console.log("pofileUpdated!");
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });

        dispatch(updateUserProfile(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;

        dispatch(login(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });
  };

  const onClickEmail = (e) => setEmail(e.target.value);
  const onClickPassword = (e) => setPassword(e.target.value);

  const handleGoogleRegister = () => {};

  return (
    <div>
      <section>
        <h1>{isLogin ? "Log in" : "Register"}</h1>
        {!isLogin && (
          <>
            <p>User Name :</p>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}
        <p>Email :</p>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            value={email}
            onChange={onClickEmail}
          />
        </label>
      </section>
      <section>
        <p>Password : </p>
        <label htmlFor="password">
          <input type="password" value={password} onChange={onClickPassword} />
        </label>
      </section>

      {isLogin ? (
        <button onClick={handleLogin}>Log in</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}
      {/* <button onClick={handleLogin}>{isLogin ? "Log in" : "Register"}</button> */}
      <span>Forgot a password?</span>
      <span onClick={isLoginHandler}>
        {isLogin ? "Create New account?" : "Back to Login"}
      </span>
      <button onClick={handleGoogleRegister}>
        {isLogin ? "Log in width Google" : "Register width Google"}
      </button>
    </div>
  );
};
