import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMember } from "./operations";
import { initialState } from "./initializes";


export const memberSlice = createSlice({
    name: 'member',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMemberItemsAsync.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMemberItemsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.member = action.payload
            })
            .addCase(fetchMemberItemsAsync.rejected, (state, action) => {
                state.loading = false
                state.member = []
                state.error = action.error.message || 'Failed to fetch member';
            })
    },
})


export const fetchMemberItemsAsync = createAsyncThunk('member/fetchMember', 
    async () => {
        const member = await fetchMember()
        return member
    }
)

export const memberReducer = memberSlice.reducer