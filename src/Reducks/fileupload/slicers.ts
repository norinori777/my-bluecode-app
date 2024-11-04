import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { initialState } from "./initializes"
import { addFile, addFile2, fetchFile } from "./operatoins"
import { convertBufferToFile, convertBase64ToFile } from "../../utils/fetchDataConvert/convertFileDataToFileObject"


export const fileuploadSlice = createSlice({
    name: 'fileupload',
    initialState: initialState,
    reducers: {
        updateFile: (state, action) => {
            state.file = action.payload
        },
        deleteFile: (state) => {
            state.file = null
            state.file2 = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFileAsync.fulfilled, (state, action) => {
                state.loading = false
                state.file = convertBufferToFile(action.payload.file.buffer, action.payload.file.fileName, action.payload.file.mimeType)
            })
            .addCase(addFileAsync2.fulfilled, (state, action) => {
                state.loading = false
                state.file2 = convertBase64ToFile(action.payload.file, action.payload.fileName, action.payload.mimeType)
            })
            .addMatcher(action => action.type.endsWith('/pending'), (state, action) => {
                state.loading = true
                state.error = null
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action: any) => {
                state.loading = false
                state.file = null
                state.file2 = null
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

export const addFileAsync2 = createAsyncThunk('fileupload/addFile2',
    async ({ file }: AddFileType) => {
        const newFile = await addFile2(file)
        return newFile
    }
)

export const { updateFile, deleteFile } = fileuploadSlice.actions
export const fileuploadReducer = fileuploadSlice.reducer