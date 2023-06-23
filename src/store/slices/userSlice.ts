import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types'
import { login } from '../../api/user'
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserState {
    data: IUser | null;
    token: string | null
}

// Define the initial state using that type
const initialState: UserState = {
    data: null,
    token: localStorage.getItem('token')
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    extraReducers(builder) {

        builder.addCase(login.fulfilled, (state, action) => {
            state.data = action.payload.user;
            state.token = action.payload.token;
        })



    },
    reducers: {
        clear: (state) => {
            state.data = null;
            state.token = null;
        }
    },
})
export const userActions = userSlice.actions;
export default userSlice.reducer