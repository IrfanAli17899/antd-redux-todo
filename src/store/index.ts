import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/todoSlice'
import userSlice from './slices/userSlice'
// ...
const store = configureStore({
    reducer: {
        todos: todoSlice,
        user: userSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store