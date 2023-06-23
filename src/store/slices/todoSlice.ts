import { createSlice } from '@reduxjs/toolkit'
import { ITodo } from '../../types'
import { addTodo, deleteTodo, getTodos, updateTodo } from '../../api/todos'
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TodoState {
    data: ITodo[],
    loading: boolean
}

// Define the initial state using that type
const initialState: TodoState = {
    data: [],
    loading: false
}

export const todoSlice = createSlice({
    name: 'todo',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    extraReducers(builder) {
        // get todos;
        builder.addCase(getTodos.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(getTodos.rejected, (state, action) => {
            state.loading = false;
        })

        // add todo
        // builder.addCase(addTodo.pending, (state, action) => {
        //     //
        // })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.data.push(action.payload)
        })
        // builder.addCase(addTodo.rejected, (state, action) => {
        //     // state.loading = false;
        // })

        // delete todo
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.data = state.data.filter(todo => todo.id !== action.payload.id)
        })

         // update todo
         builder.addCase(updateTodo.fulfilled, (state, action) => {
            state.data[action.payload.id] = action.payload;
        })
    },
    reducers: {

    },
})

export default todoSlice.reducer