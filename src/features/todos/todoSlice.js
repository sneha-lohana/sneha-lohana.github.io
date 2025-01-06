import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const res = await axios.get("http://localhost:3000/todos");
    return res.data;
});

export const markTodoDone = createAsyncThunk("todos/markDone", async (todo) => {
    const res = await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed
    });
    return res.data;
})

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        count: 0,
        items: [],
        status: 'idle',
        error: null
    },
    // sync reducer function
    reducers: {
        increment: (state, action) => {
            return {
                ...state,
                count: state.count + 1
            }
        },
        incrementByNumber: (state, action) => {
            return {
                ...state,
                count: state.count + action.payload
            }
        }
    },
    // async reducer function
    extraReducers(builder) {
        builder.addCase(fetchTodos.pending, (state, action) => {
            return {
                ...state,
                status: 'loading'
            }
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            return {
                ...state,
                status: 'success',
                items: action.payload
            }
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload.message
            }
        });
        builder.addCase(markTodoDone.pending, (state, action) => {
            return {
                ...state,
                status: 'loading'
            }
        });
        builder.addCase(markTodoDone.fulfilled, (state, action) => {
            const todo = action.payload;
            return {
                ...state,
                status: 'success',
                items: state.items.map(t => {
                    if (todo.id === t.id){
                        return todo;
                    }
                    return t;
                })
            }
        });
        builder.addCase(markTodoDone.rejected, (state, action) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload.message
            }
        });
    }
})

// actions
export const {increment, incrementByNumber} = todoSlice.actions;

// reducer
export default todoSlice.reducer;

// Selector
export const selectCount = (state) => state.todos.count;
export const selectTodos = (state) => state.todos.items;
export const selectStatus = (state) => state.todos.status;
export const selectError = (state) => state.todos.error;