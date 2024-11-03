import { configureStore } from '@reduxjs/toolkit'
import { menuReducer } from '../menu/slices'
import { contentReducer } from '../contents/slices'
import { counterReducer } from '../counter/slices'
import { memberReducer } from '../member/slices'
import { todoReducer } from '../todo/slices'
import { testReducer } from '../test/slices'
import { fileuploadReducer } from '../fileupload/slicers'


export const store = configureStore({
    reducer: {
        menu: menuReducer,
        contents: contentReducer,
        counter: counterReducer,
        member: memberReducer,
        todo: todoReducer,
        test: testReducer,
        fileupload: fileuploadReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

