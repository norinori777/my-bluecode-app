import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initializes"
import { addFile, fetchFile } from "./operatoins"
import { convertBufferToFile } from "../../utils/fetchDataConvert/convertBufferToFile"


export const fileuploadSlice = createSlice({
    name: 'fileupload',
    initialState: initialState,
    reducers: {
        updateFile: (state, action) => {
            state.file = action.payload
        },
        deleteFile: (state) => {
            state.file = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFileItemsAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchFileItemsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.file = action.payload
            })
            .addCase(addFileAsync.fulfilled, (state, action) => {
                state.loading = false
                state.file = convertBufferToFile(action.payload.file.buffer, action.payload.file.fileName, action.payload.file.mimeType)
            })
            .addCase(fetchFileItemsAsync.rejected, (state, action) => {
                state.loading = false
                state.file = null
                state.error = action.error.message || 'Failed to fetch file';
            })
    },
})



export const fetchFileItemsAsync = createAsyncThunk('fileupload/fetchFile',
    async () => {
        const file = await fetchFile()
        return file
    }
)

export const addFileAsync = createAsyncThunk('fileupload/addFile',
    async ({ file }: AddFileType) => {
        const newFile = await addFile(file)
        return newFile
    }
)


export const { updateFile, deleteFile } = fileuploadSlice.actions
export const fileuploadReducer = fileuploadSlice.reducer