import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer, counterSlice } from '../counter/slices';
import { initialState } from '../counter/initializes';
import { RootState } from '../store';

describe('counterのslicersのテスト', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                counter: counterSlice.reducer,
            },
        });
    });

    it('初期値のテスト', () => {
        expect(counterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('カウンターのインクリメント', () => {
        store.dispatch(counterSlice.actions.increment());
        expect((store.getState() as RootState).counter.count).toBe(1);
    });

    it('カウンターのデクリメント', () => {
        store.dispatch(counterSlice.actions.decrement());
        expect((store.getState() as RootState).counter.count).toBe(-1);
    });

    it('カウンターのリセット', () => {
        store.dispatch(counterSlice.actions.increment());
        store.dispatch(counterSlice.actions.increment());
        store.dispatch(counterSlice.actions.reset());
        expect((store.getState() as RootState).counter.count).toBe(0);
    });
});