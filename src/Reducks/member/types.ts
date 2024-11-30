export type Member = user[]

export interface MemberState {
    searchText: string
    startDate: Date | null;
    endDate: Date | null;
    member: Member;
    loading: boolean;
    error: string | null;
}

export type user = {
    id: string;
    position: string;
    name: string;
    email: string;
    status: boolean;
}

export type AddUserType = {
    position: string;
    name: string;
    email: string;
    status: boolean;
}
