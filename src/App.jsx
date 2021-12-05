import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { TodosField } from "./components/TodosField";
import { Login } from "./auth/Login";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { selectUser, login, logout } from "./feature/usersSlice";
import { Signin } from "./auth/Signin";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const uid = user.uid;
        const displayName = user.displayName;
        console.log(uid);
        console.log(displayName);
        dispatch(
          login({
            uid: uid,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    // return () => {
    //   unSub();
    // };
  }, [dispatch, auth]);

  return (
    <>
      {user.uid ? (
        <div className="App">
          <TodosField />
        </div>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default App;
