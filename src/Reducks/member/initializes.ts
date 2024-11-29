import { MemberState } from './types' // Adjust the import path as necessary

export const initialState: MemberState = {
    searchText: '',
    startDate: null,
    endDate: null,
    member: [],
    loading: false,
    error: null,
}