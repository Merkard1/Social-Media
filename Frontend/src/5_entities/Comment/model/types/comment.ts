export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        username: string;
    }
}
