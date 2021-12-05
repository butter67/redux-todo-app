import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, moveTask } from "../TasksSlice";
import { getDatabase, ref, child, get, remove, set } from "firebase/database";
import { addStore } from "../TasksSlice";
import { db } from "../firebase";

export const Undone = () => {
  const tasks = useSelector((state) => state.tasks.undone);
  const uid = useSelector((state) => state.users.user.uid);
  const taskCountNum = useSelector((state) => state.tasks.taskCount);
  console.log(tasks);

  const dispatch = useDispatch();

  //タスクを削除し、databaseからも削除
  const onDeleteTask = (i, uid, id) => {
    console.log(id);
    const db = getDatabase();
    remove(ref(db, `users/${uid}/undone/${id}`));
    dispatch(deleteTask({ index: i, uid: uid }));
  };

  //タスクをDoneに移動し、databaseも削除→Doneに移動
  const onDone = (i, task, id) => {
    console.log(task.id);
    const db = getDatabase();
    set(ref(db, `users/${uid}/done/${id}`), {
      content: task.content,
      completed: true,
      id: task.id,
    });
    remove(ref(db, `users/${uid}/undone/${task.id}`));
    dispatch(
      moveTask({ index: i, content: task.content, completed: task.completed })
    );
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const result = snapshot.val();
          const resUndone = result.undone;
          const cleanUndone = Object.values(resUndone);
          // console.log(cleanUndone);
          // cleanUndone.map((val) => console.log(val.content));
          dispatch(addStore(cleanUndone));
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
      {tasks.length >= 5 && <Sp>You can add a task up to 5!</Sp>}

      <ul>
        {tasks.map((task, i) => (
          <SList key={i}>
            <Spar>{task.content}</Spar>
            <SBtn onClick={() => onDone(i, task, task.id)}>Done</SBtn>
            <SDBtn onClick={() => onDeleteTask(i, uid, task.id)}>Delete</SDBtn>
          </SList>
        ))}
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
