export class CommentResponseDto {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    username: string;
  };
}
