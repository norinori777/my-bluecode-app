export type Member = user[]

export interface MemberState {
    member: Member;
    loading: boolean;
    error: string | null;
}

export type user = {
    id: number;
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
