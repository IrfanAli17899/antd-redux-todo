import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import { ITodo } from "../../types";

const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/todos');
            return data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todo: Partial<ITodo>, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/todos', todo);
            return data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (todo: Partial<ITodo>, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/todos/${todo.id}`, todo);
            return data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/todos/${id}`);
            return data;
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
}

