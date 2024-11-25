export class CommentResponseDto {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
    profile: any;
  };
}
