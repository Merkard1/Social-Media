import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: "Content shouldn't be empty" })
  @IsString()
  content: string;
}
