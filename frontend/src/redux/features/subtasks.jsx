import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SubTasks: [],
};

const subTasksSlice = createSlice({
  name: "subtasks",
  initialState,
  reducers: {
    addSubTask: (state, action) => {
      state.SubTasks.push(action.payload);
    },
    setSubTask: (state, action) => {
      state.SubTasks = action.payload;
      console.log(action.payload);
    },

    clearSubTasks: (state) => {
      state.SubTasks = [];
      console.log(state.SubTasks);
    },
  },
});

export const { addSubTask, clearSubTasks, setSubTask } = subTasksSlice.actions;
export default subTasksSlice.reducer;
