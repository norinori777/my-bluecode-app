import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";



const fileuploadSelector = (state: RootState) => state.fileupload;

export const fileItems = createSelector(
    [fileuploadSelector],
    (state) => state.file
)