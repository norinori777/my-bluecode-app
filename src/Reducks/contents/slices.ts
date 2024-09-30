
import { createSlice } from "@reduxjs/toolkit";
import { contentItems,  } from "../../contents/contents";

export const contentSlice = createSlice({
    name: 'contents',
    initialState: {
        contentItems: contentItems,
    },
    reducers: {

    },
})

export const contentReducer =  contentSlice.reducer