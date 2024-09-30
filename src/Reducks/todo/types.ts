export type todo = {
    id: number;
    text: string;
    done: boolean;
}

export interface TodoState {
    todos: todo[],
    loading: boolean,
    error: string | null;
}