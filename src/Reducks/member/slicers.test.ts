import { memberReducer,fetchMemberItemsAsync } from './slices';
import { configureStore } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { initialState } from './initializes';

const mock = new MockAdapter(axios);

describe('memberのslicesのテスト', () => {

  it('初期値のテスト', () => {
    expect(memberReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchMemberItemsAsyncが情報取得中の場合', () => {
    const action = { type: fetchMemberItemsAsync.pending.type };
    const state = memberReducer(initialState, action);
    expect(state).toEqual({
      searchText: '',
      member: [],
      loading: true,
      error: null,
    });
  });

  it('fetchMemberItemsAsyncが情報取得できた場合', async () => {
    const member = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    ];
    mock.onGet('http://localhost:8080/member').reply(200, member);

    const store = configureStore({ reducer: memberReducer });
    await store.dispatch(fetchMemberItemsAsync());

    const state = store.getState();
    expect(state).toEqual({
      searchText: '',
      member,
      loading: false,
      error: null,
    });
  });

  it('fetchMemberItemsAsyncが情報取得失敗した場合', async () => {
    mock.onGet('http://localhost:8080/member').reply(500);

    const store = configureStore({ reducer: memberReducer });
    await store.dispatch(fetchMemberItemsAsync());

    const state = store.getState();
    expect(state).toEqual({
      searchText: '',
      member: [],
      loading: false,
      error: 'Request failed with status code 500',
    });
  });
});