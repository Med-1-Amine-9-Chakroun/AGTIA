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
    },
    removeTask: (state, action) => {
      const { taskId, from } = action.payload;
      state[from] = state[from].filter((task) => task._id !== taskId);
    },
    addTask: (state, action) => {
      state.toDo.push(action.payload);
    },
    updateTaskById: (state, action) => {
      const { taskId, updatedTask } = action.payload;

      // Helper function to update task in the array
      const updateTaskInList = (list) => {
        const index = list.findIndex((task) => task._id === taskId);
        if (index !== -1) {
          list[index] = { ...list[index], ...updatedTask };
          return true;
        }
        return false;
      };

      // Update task in the lists
      if (updateTaskInList(state.toDo)) {
        state.selectedTask = {
          ...state.toDo.find((task) => task._id === taskId),
        };
      } else if (updateTaskInList(state.doing)) {
        state.selectedTask = {
          ...state.doing.find((task) => task._id === taskId),
        };
      } else if (updateTaskInList(state.done)) {
        state.selectedTask = {
          ...state.done.find((task) => task._id === taskId),
        };
      }
    },
  },
});

export const {
  selectTask,
  moveTask,
  setTasks,
  clearTasks,
  addTask,
  removeTask,
  updateTaskById,
} = tasksSlice.actions;
export default tasksSlice.reducer;
