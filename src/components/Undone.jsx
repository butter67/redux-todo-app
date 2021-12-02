import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, moveTask } from "../TasksSlice";
import { getDatabase, ref, child, get } from "firebase/database";
import { addStore } from "../TasksSlice";

export const Undone = () => {
  const tasks = useSelector((state) => state.tasks.undone);
  const uid = useSelector((state) => state.users.user.uid);
  // const taskCountNum = useSelector((state) => state.tasks.taskCount);
  console.log(tasks[0]);

  const dispatch = useDispatch();

  const onDeleteTask = (i, uid) => {
    dispatch(deleteTask({ index: i, uid: uid }));
  };
  const onDone = (i, task) => {
    dispatch(moveTask({ index: i, taskObject: task }));
  };

  // const deleteFromFireBase = () => {
  //   const db = getDatabase();
  //   db.ref("users").child(`${uid}/undone/0`).remove();
  // };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}/undone/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          // const undoneNum = res.length;
          // console.log(undoneNum);
          dispatch(addStore(res));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, uid]);

  return (
    <STaskArea>
      <STaskttl>Undone Tasks</STaskttl>
      {/* <Sspan>{`今タスクが ${taskCountNum} 個あるよ`}</Sspan> */}
      {tasks.length >= 5 && <Sp>You can add a task up to 5!</Sp>}

      <ul>
        {/* {tasks[0].map((task) => console.log(task))} */}

        {/* {tasks.map((task, i) => (
          <SList key={i}>
            <Spar>{task.content}</Spar>
            <SBtn onClick={() => onDone(i, task)}>Done</SBtn>
            <SDBtn onClick={() => onDeleteTask(i, uid)}>Delete</SDBtn>
          </SList>
        ))} */}
      </ul>
    </STaskArea>
  );
};

const STaskArea = styled.div`
  background: #e8d3d1;
  width: 46%;
  border-radius: 16px;
  padding: 16px;
  min-height: 260px;
`;

const STaskttl = styled.h2`
  font-size: 26px;
  text-align: center;
  color: #383c3c;
  font-family: "Cabin", sans-serif;
`;

const Sspan = styled.span`
  display: block;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
`;

const Sp = styled.p`
  text-align: center;
  color: #da536e;
`;

const SList = styled.li`
  display: flex;
  align-items: center;
`;

const Spar = styled.p`
  margin-right: 18px;
`;

const SBtn = styled.button`
  height: 40px;
  min-width: 60px;
  margin: 0px 4px;
  border-radius: 10px;
  border: none;
  background: #f7b977;
  color: white;
  font-weight: bold;
  transition: 0.2s all;
  font-family: "Cabin", sans-serif;
  &:hover {
    transition: 0.2s all;
    cursor: pointer;
    opacity: 0.8;
  }
`;
const SDBtn = styled.button`
  height: 40px;
  min-width: 60px;
  margin: 0px 4px;
  border-radius: 10px;
  border: none;
  background: #c8c2be;
  color: white;
  font-weight: bold;
  transition: 0.2s all;
  font-family: "Cabin", sans-serif;
  &:hover {
    opacity: 0.8;
    transition: 0.2s all;
    cursor: pointer;
  }
`;
