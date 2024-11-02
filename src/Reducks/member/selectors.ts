import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { user } from "./types";


const memberSelector = (state: RootState) => state.member

export const memberItems = createSelector(
    [memberSelector],
    (state) => state.member
)

export const divideMemberToPosition = createSelector(
    [memberItems],
    (state) => {
        return state.reduce((acc: { [key: string]: user[] }, member) => {
            if (!acc[member.position]) {
                acc[member.position] = []
            }
            acc[member.position].push(member)
            return acc
        }, {})
    }
)

export const loadingState = createSelector(
    [memberSelector],
    (state) => state.loading
)

export const errorState = createSelector(
    [memberSelector],
    (state) => state.error
)