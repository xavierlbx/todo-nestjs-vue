import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'lucas@email.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário com pelo menos 6 caracteres',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
