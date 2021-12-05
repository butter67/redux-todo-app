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
      const id = tasks.id;

      const undDone = [...state.undone];
      const newUnDone = undDone.concat(tasks);
      return {
        undone: [...newUnDone],
        done: [...state.done],
        taskCount: taskCountNum,
        id: id,
      };
    },

    //タスクの削除
    deleteTask: (state, action) => {
      console.log(action.payload);
      const uid = action.payload.uid;

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
      const unDone = [...state.undone];
      // console.log(target.index);
      unDone.splice(target.index, 1);

      const movedTasks = [...state.done];
      const newDone = movedTasks.concat(target);
      return {
        undone: [...unDone],
        done: [...newDone],
      };
    },

    //タスクを未完了に戻す
    backTask: (state, action) => {
      const target = action.payload;
      console.log(target);
      const newDoneTasks = [...state.done];
      newDoneTasks.splice(target.index, 1);

      const undoneTasks = [...state.undone];
      const newUnDone = undoneTasks.concat(target);

      return {
        undone: [...newUnDone],
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
