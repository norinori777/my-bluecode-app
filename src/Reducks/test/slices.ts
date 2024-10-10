import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTest } from "./operations";
import { initialState } from "./initializes";


export const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestAsync.pending, (state, action) => {
                // state.test = "loading"
                
            })
            .addCase(fetchTestAsync.fulfilled, (state, action) => {
                state.test = action.payload.test
            })
            .addCase(fetchTestAsync.rejected, (state, action) => {
                // state.test = "error"

            })
    },
})


export const fetchTestAsync = createAsyncThunk('test/fetchTest', 
    async () => {
        const test = await fetchTest()
        return test
    }
)

export const testReducer = testSlice.reducer