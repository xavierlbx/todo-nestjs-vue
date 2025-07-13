import { IsString, IsOptional, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
   @ApiProperty({
      example: 'Comprar leite',
      description: 'Título da tarefa',
      maxLength: 100,
   })
   @IsString({ message: 'O título deve ser um texto / string' })
   @MaxLength(100, { message: 'O título não pode ultrapassar 100 caracteres' })
   title: string;

   @ApiProperty({
      example: 'Ir no mercado e comprar 2 litros de leite integral',
      description: 'Descrição detalhada da tarefa',
      required: false,
      maxLength: 300,
   })
   @IsOptional()
   @IsString({ message: 'A descrição deve ser um texto / string' })
   @MaxLength(300, { message: 'A descrição não pode ultrapassar as 300 caracteres' })
   description?: string;

   @ApiProperty({
      example: '2025-08-01T18:00:00.000Z',
      description: 'Data limite para concluir a tarefa',
      required: false,
   })
   @IsOptional()
   @IsDateString({}, { message: 'Deve ser uma data válida' })
   dueDate?: string;
}
