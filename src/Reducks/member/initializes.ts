import { MemberState } from './types' // Adjust the import path as necessary

export const initialState: MemberState = {
    searchText: '',
    member: [],
    loading: false,
    error: null,
}