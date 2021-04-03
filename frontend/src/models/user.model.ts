export type User = {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    created_at: Date;
    deleted_at: null | Date;
}