
import { createSlice } from '@reduxjs/toolkit';


const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    listTasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.listTasks = action.payload;    
    },
    addTask: (state, action) => {
      const newTask = {
        title: action.payload,
       
        description: action.payload,
        isComplete: false,
        gain: (action.payload),

        completed: false,
      };
      state.push(newTask);
    },
    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
        return state;
      }
    },

    updateTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload;
        task.description = action.payload;
        task.gain =(action.payload);
        return state;
      }
    },
  }
});
  
export const { addTask, toggleTask, removeTask, updateTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;