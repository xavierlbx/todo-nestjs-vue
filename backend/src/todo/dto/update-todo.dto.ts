import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
   @ApiProperty({
      example: true,
      description: 'Se a tarefa foi concluída ou não',
      required: false,
   })
   @IsOptional()
   @IsBoolean({ message: 'O campo done deve ser verdadeiro ou falso (boolean)' })
   done?: boolean;
}
