import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";

const initialState = {
  undone: [
    // { content: "1Hello", completed: false },
    // { content: "2Hey!", completed: false },
    // { content: "3Hola~", completed: false },
    // { content: "4Yoh!", completed: false },
  ],
  done: [
    // { content: "5", completed: false }
  ],
};

export const TasksSlice = createSlice({
  name: "tasks",

  initialState,
  reducers: {
    //タスクの追加
    addStore: (state, action) => {
      const tasks = action.payload;
      const taskCountNum = tasks.length;
      // console.log(taskCountNum);
      const undDone = [...state.undone];
      const newUnDone = undDone.concat(tasks);
      return {
        undone: [...newUnDone],
        done: [...state.done],
        taskCount: taskCountNum,
      };
    },

    //タスクの削除
    deleteTask: (state, action) => {
      console.log(action.payload);
      const uid = action.payload.uid;

      // const db = getDatabase();
      // remove(ref(db, "users/" + uid + "/0/"));
      // const db = getDatabase();
      // db.ref("users").child(`${uid}/undone/0`).remove();

      const i = action.payload.index;
      const newTasks = [...state.undone];
      newTasks.splice(i, 1);
      return {
        undone: [...newTasks],
        done: [...state.done],
      };
    },

    //タスクの完了でDone Tasksに移動する
    moveTask: (state, action) => {
      const target = action.payload;
      const moveTasks = [...state.undone];
      console.log(target);
      console.log(target.index);
      console.log(target.taskObject.content);
      moveTasks.splice(target.index, 1);

      const doneTasks = [...state.done, target.taskObject];

      return {
        undone: [...moveTasks],
        done: [...doneTasks],
      };
    },

    //タスクを未完了に戻す
    backTask: (state, action) => {
      const target = action.payload;
      const newDoneTasks = [...state.done];
      newDoneTasks.splice(target.index, 1);

      const newUndoneTasks = [...state.undone, target.taskObject];

      return {
        undone: [...newUndoneTasks],
        done: [...newDoneTasks],
      };
    },
  },
});

export const getUsers = () => {
  return async (dispatch) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    dispatch(setUsers(data));
  };
};

export const {
  addStore,
  deleteTask,
  moveTask,
  backTask,
  setUsers,
} = TasksSlice.actions;
export default TasksSlice.reducer;
