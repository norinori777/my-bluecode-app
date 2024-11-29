import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMember, fetchMember } from "./operations";
import { initialState } from "./initializes";
import { AddUserType } from "./types";


export const memberSlice = createSlice({
    name: 'member',
    initialState: initialState,
    reducers: {
        updateSearchText: (state, action) => {
            state.searchText = action.payload
        },
        updateStartDate: (state, action) => {
            state.startDate = action.payload
        },
        updateEndDate: (state, action) => {
            state.endDate = action.payload
        },
        updateMember: (state, action) => {
            state.member = action.payload
        },
        deleteMember: (state, action) => {
            state.member = state.member.filter((member) => member.id !== action.payload)
        },
        partialReset: (state) => {
            state.loading = false
            state.error = ''
            state.member = []
        },
        reset: (state) => {
            state.searchText = ''
            state.startDate = null
            state.endDate = null
            state.loading = false
            state.error = ''
            state.member = []
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMemberItemsAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchMemberItemsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.member = action.payload
            })
            .addCase(addMemberAsync.fulfilled, (state, action) => {
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

export const addMemberAsync = createAsyncThunk('member/addMember',
    async ({ name, email, position, status }: AddUserType) => {
        const newMember = await addMember(name, email, position, status)
        return newMember
    }
)

export const { updateMember,deleteMember, updateSearchText, updateStartDate, updateEndDate, partialReset, reset } = memberSlice.actions
export const memberReducer = memberSlice.reducer