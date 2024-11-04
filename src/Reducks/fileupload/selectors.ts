import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const fileuploadSelector = (state: RootState) => state.fileupload;

export const fileItems = createSelector(
    [fileuploadSelector],
    (state) => state.file
)

export const fileItems2 = createSelector(
    [fileuploadSelector],
    (state) => state.file2
)

export const loading = createSelector(
    [fileuploadSelector],
    (state) => state.loading
)

export const error = createSelector(
    [fileuploadSelector],
    (state) => state.error
)