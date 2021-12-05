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
        console.log(errorCode);
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
    <Sdiv>
      <SMain>
        <Sh1>{isLogin ? "Log in" : "Register"}</Sh1>
        <section>
          {!isLogin && (
            <>
              {/* <Sp>User Name :</Sp> */}
              <input
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
              />
            </>
          )}
          {/* <Sp>Email :</Sp> */}
          <label htmlFor="email">
            <Sinput
              type="text"
              name="email"
              value={email}
              onChange={onClickEmail}
              placeholder="Your Email"
            />
          </label>
        </section>
        <section>
          {/* <Sp>Password : </Sp> */}
          <label htmlFor="password">
            <Sinput
              type="password"
              value={password}
              onChange={onClickPassword}
              placeholder="Password"
            />
          </label>
        </section>

        {isLogin ? (
          <button onClick={handleLogin}>Log in</button>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )}

        <span>Forgot a password?</span>
        <span onClick={isLoginHandler}>
          {isLogin ? "Create New account?" : "Back to Login"}
        </span>
        <button onClick={handleGoogleRegister}>
          {isLogin ? "Log in width Google" : "Register width Google"}
        </button>
      </SMain>
    </Sdiv>
  );
};

const Sdiv = styled.div`
  position: relative;
`;

const Sh1 = styled.h1`
  font-size: 36px;
`;

const SMain = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #dbebc4;
  padding: 20px 40px 60px 40px;
  border-radius: 10px;
`;

const Sinput = styled.input`
  border: 1px solid lightgray;
  padding: 16px;
  min-width: 280px;
  border-radius: 50px;
  font-size: 20px;
  margin-bottom: 16px;
`;

// const Sp = styled.p`
//   font-size: 22px;
//   font-weight: 600;
//   margin-bottom: 8px;
// `;
