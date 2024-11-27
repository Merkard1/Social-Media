export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    user: {
        username: string;
    };
}
