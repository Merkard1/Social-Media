export type NotificationType = "COMMENT" | "MESSAGE"

export interface Notification {
    id: string;
    title: string;
    description: string;
    href?: string;
}
