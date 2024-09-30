export type Member = user[]

export interface MemberState {
    member: Member;
    loading: boolean;
    error: string | null;
}

export type user = {
    id: string;
    name: string;
    email: string;
}