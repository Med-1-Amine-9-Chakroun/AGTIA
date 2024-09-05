import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDo: [],
  doing: [],
  done: [],
  selectedTask: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.toDo = action.payload.toDo;
      state.doing = action.payload.doing;
      state.done = action.payload.done;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    clearTasks: (state) => {
      state.toDo = [];
      state.doing = [];
      state.done = [];
    },
    moveTask: (state, action) => {
      const { taskId, from, to } = action.payload;
      console.log("****************************************");
      console.log(state[from]);
      // Find the task in the `from` state array
      const task = state[from].find((task) => task._id === taskId);
      if (!task) return;
      switch (to) {
        case "toDo":
          task.statusTask = "To Do";
          break;
        case "doing":
          task.statusTask = "Doing";
          break;
        case "done":
          task.statusTask = "Done";
          break;
      }
      // Remove the task from the `from` state array
      state[from] = state[from].filter((task) => task._id !== taskId);

      // Add the task to the `to` state array
      state[to].push(task);
      console.log(state[to]);
      console.log("****************************************");
    },
    addTask: (state, action) => {
      state.toDo.push(action.payload);
    },
  },
});

export const { selectTask, moveTask, setTasks, clearTasks, addTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
