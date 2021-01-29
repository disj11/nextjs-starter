export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface ServerResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: object;
    config: object;
    request: object;
}