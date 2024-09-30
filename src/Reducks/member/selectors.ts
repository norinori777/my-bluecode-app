import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


const memberSelector = (state: RootState) => state.member

export const memberItems = createSelector(
    [memberSelector],
    (state) => state.member
)

export const loadingState = createSelector(
    [memberSelector],
    (state) => state.loading
)

export const errorState = createSelector(
    [memberSelector],
    (state) => state.error
)