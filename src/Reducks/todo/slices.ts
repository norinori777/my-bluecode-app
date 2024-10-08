import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTodo, deleteTodo, doneTodo, fetchTodo, updateTodo } from "./operations"
import { initialTodoState } from "./initializes"
import { todo } from "./types"


export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoItemsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.todos = action.payload
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.loading = false
                state.todos.push(action.payload)
            })
            .addCase(updateDoneTodoAsync.fulfilled, (state, action) => {
                state.loading = false
                const index = state.todos.findIndex(todo => todo.id === action.payload.id)
                state.todos[index] = action.payload
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.loading = false
                const index = state.todos.findIndex(todo => todo.id === action.payload.id)
                state.todos[index] = action.payload
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.loading = false
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state, action) => {
                state.loading = true
                state.error = null
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action: any) => {
                state.loading = false
                state.todos = []
                state.error = action.error.message || 'Failed to fetch todo';
            })
    }
})

export const fetchTodoItemsAsync = createAsyncThunk('todo/fetchTodo',
    async () => {
        const todos = await fetchTodo()
        return todos
    }
)

export const addTodoAsync = createAsyncThunk('todo/addTodo',
    async(text: string) => {
        const todo = await addTodo(text)
        return todo
    }
)

export const updateDoneTodoAsync = createAsyncThunk('todo/updateDoneTodo',
    async(id: number) => {
        const todo = await doneTodo(id)
        return todo
    }
)

export const deleteTodoAsync = createAsyncThunk('todo/deleteTodo',
    async(id: number) => {
        const todo = await deleteTodo(id)
        return todo
    }
)

export const updateTodoAsync = createAsyncThunk('todo/updateTodo',
    async(todo: todo) => {
        const result = await updateTodo(todo.id, todo.text)
        return result
    }
)

export const todoReducer = todoSlice.reducer