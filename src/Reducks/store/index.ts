import { configureStore } from '@reduxjs/toolkit'
import { menuReducer } from '../menu/slices'
import { contentReducer } from '../contents/slices'
import { counterReducer } from '../counter/slices'
import { memberReducer } from '../member/slices'


export const store = configureStore({
    reducer: {
        menu: menuReducer,
        contents: contentReducer,
        counter: counterReducer,
        member: memberReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

