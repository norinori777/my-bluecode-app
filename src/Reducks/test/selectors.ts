import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


const testSelector = (state: RootState) => state.test

export const testState = createSelector(
    [testSelector],
    (state) => state.test
)
