import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import tasksReducer from "./features/tasks";
import subtasksReducer from "./features/subtasks";
("./features/subtasks");

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
    subTasks: subtasksReducer,
  },
});
