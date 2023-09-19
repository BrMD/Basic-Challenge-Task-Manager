import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import task from "../interfaces/tasks"
import { RootState } from "../app/store"

export interface TasksState {
  Tasks: Array<task>
}

const initialState: TasksState = {
  Tasks: JSON.parse(sessionStorage.getItem("Tasks") || "[]"),
}

export const TasksSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    createTask: (state, action: PayloadAction<task>) => {
      state.Tasks.push(action.payload)
      sessionStorage.setItem("Tasks", JSON.stringify(state.Tasks))
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const positionToDelete = state.Tasks.findIndex(
        (task) => task.id === action.payload,
      )
      state.Tasks.splice(positionToDelete, 1)
      sessionStorage.setItem("Tasks", JSON.stringify(state.Tasks))
    },
    completeTask: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line array-callback-return
      state.Tasks.filter((task) => {
        if (task.id === action.payload) task.status = !task.status
      })
      sessionStorage.setItem("Tasks", JSON.stringify(state.Tasks))
    },
    editTask: (state, action: PayloadAction<task>) => {
      // eslint-disable-next-line array-callback-return
      state.Tasks.filter((task) => {
        if (task.id === action.payload.id) task.name = action.payload.name
      })
      sessionStorage.setItem("Tasks", JSON.stringify(state.Tasks))
    },
  },
})

export const { createTask, deleteTask, completeTask, editTask } =
  TasksSlice.actions

export const selectTask = (state: RootState) => state.tasks.Tasks

export default TasksSlice.reducer
