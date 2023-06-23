import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { IUser } from "../../types";

const login = createAsyncThunk(
    'user/login',
    async (details: IUser, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/login', details);
            return data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export {
    login,
}

