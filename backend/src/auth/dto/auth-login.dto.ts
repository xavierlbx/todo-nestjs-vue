import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
   @ApiProperty({
      example: 'lucas@email.com',
      description: 'Email do usuário',
   })
   @IsEmail({}, { message: 'Favor informar um email válido!' })
   email: string;

   @ApiProperty({
      example: 'senha123',
      minLength: 6,
   })
   @IsString({ message: 'A senha deve ser um texto!' })
   @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres!',
   })
   password: string;
}
