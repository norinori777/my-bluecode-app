
import { createSlice } from "@reduxjs/toolkit";
import { initialMenuState } from "./initializes";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: initialMenuState,
    reducers: {
        selectMenuItem: (state, action) => {
            state.selectedMeneItem = action.payload;
        },
    },
})

export const { selectMenuItem } = menuSlice.actions
export const menuReducer =  menuSlice.reducer