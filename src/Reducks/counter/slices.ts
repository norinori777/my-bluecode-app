import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initializes";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: state => {
            state.count += 1
        },
        decrement: state => {
            state.count -= 1
        },
        reset: state => {
            state.count = 0
        }
    },
})

export const { increment, decrement, reset } = counterSlice.actions
export const counterReducer = counterSlice.reducer