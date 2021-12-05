import styled from "styled-components";
import { useEffect } from "react";
import { getDatabase, ref, child, get, remove, set } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { moveTask, backTask } from "../TasksSlice";

export const Done = () => {
  const tasks = useSelector((state) => state.tasks.done);
  const uid = useSelector((state) => state.users.user.uid);
  const dispatch = useDispatch();
  console.log(tasks);

  const onClickBack = (i, task, id) => {
    const db = getDatabase();
    set(ref(db, `users/${uid}/undone/${id}`), {
      content: task.content,
      completed: true,
      id: task.id,
    });
    remove(ref(db, `users/${uid}/done/${task.id}`));
    dispatch(
      backTask({ index: i, content: task.content, completed: task.completed })
    );
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const result = snapshot.val();
          const resDone = result.done;
          console.log(resDone);
          const cleanDone = Object.values(resDone);
          console.log(cleanDone);
          // cleanUndone.map((val) => console.log(val.content));
          dispatch(moveTask(cleanDone));
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
      <STaskttl>Done Tasks</STaskttl>
      <ul>
        {tasks.map((task, i) => (
          <SList key={i}>
            <Spar>{task.content}</Spar>
            <SBtn onClick={() => onClickBack(i, task, task.id)}>Back</SBtn>
          </SList>
        ))}
      </ul>
    </STaskArea>
  );
};

const STaskArea = styled.div`
  background: #d3cbc6;
  width: 46%;
  border-radius: 16px;
  padding: 16px;
  min-height: 260px;
`;

const STaskttl = styled.h2`
  text-align: center;
  color: #383c3c;
  font-family: "Cabin", sans-serif;
  font-size: 26px;
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
  background: #92b5a9;
  color: white;
  font-weight: bold;
  transition: 0.2s all;
  font-family: "Cabin", sans-serif;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: 0.2s all;
  }
`;
