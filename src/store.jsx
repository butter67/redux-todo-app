import { configureStore } from "@reduxjs/toolkit";

import TasksReducer from "./TasksSlice";
import UsersReducer from "./feature/usersSlice";

export default configureStore({
  reducer: {
    tasks: TasksReducer,
    users: UsersReducer,
  },
});
