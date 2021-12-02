import styled from "styled-components";
import { storage, db, auth } from "../firebase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStore } from "../TasksSlice";
import { selectUser } from "../feature/usersSlice";
import { getDatabase, ref, set, push } from "firebase/database";

export const Input = () => {
  const uid = useSelector((state) => state.users.user.uid);
  const taskCountNum = useSelector((state) => state.tasks.taskCount); //途中
  // console.log(taskCountNum);

  const [val, setVal] = useState("");
  const [countNum, setCountNum] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setVal(() => e.target.value);
  };

  // const onAddStore = () => {
  //   if (!val) return;
  //   dispatch(addStore({ content: val, completed: false }));
  //   setVal("");
  // };

  const writeUserData = (content, completed) => {
    if (!val) return;
    dispatch(addStore({ content: val, completed: false }));
    const db = getDatabase();
    push(ref(db, `users/${uid}/undone`), {
      //途中
      content: val,
      completed: false,
    });
    // setCountNum((countNum) => countNum + 1);
    // console.log(countNum);
    setVal("");
  };

  return (
    <SInputArea>
      <SInput
        value={val}
        onChange={handleChange}
        placeholder="Add something here!"
      />

      <SAddBtn onClick={() => writeUserData(val)}>Add</SAddBtn>
      {/* <SAddBtn onClick={() => onAddStore(val)}>Add</SAddBtn> */}
    </SInputArea>
  );
};

const SInputArea = styled.div`
  background: #fcfcfc;
  text-align: center;
  width: 100%;
  margin-top: 16px;
`;

const SInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 30px;
  padding: 6px 10px 6px 16px;
  border: 1px solid lightgray;
  margin-right: 16px;
  font-size: 14px;
  font-family: "Cabin", sans-serif;
  letter-spacing: 0.1em;
  &:focus {
    outline: none;
  }
`;

const SAddBtn = styled.button`
  border: none;
  background: #ee836f;
  border-radius: 30px;
  height: 40px;
  width: 60px;
  color: white;
  font-weight: bold;
  font-size: 15px;
  transition: 0.2s all;
  font-family: "Cabin", sans-serif;
  letter-spacing: 0.08em;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.2s all;
  }
`;
