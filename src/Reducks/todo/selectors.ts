import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const todoSelector = (state: RootState) => state.todo

export const todoItems = createSelector(
    [todoSelector],
    (state) => state.todos
)

export const todoItem = (id: number) => createSelector(
    [todoSelector],
    (state) => state.todos.find(todo => todo.id === id)
)

export const loadingState = createSelector(
    [todoSelector],
    (state) => state.loading
)

export const errorState = createSelector(
    [todoSelector],
    (state) => state.error
)