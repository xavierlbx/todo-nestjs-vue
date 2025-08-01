import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
   constructor(private prisma: PrismaService) {}

   private async emailExists(email: string): Promise<boolean> {
      const user = await this.prisma.user.findUnique({ where: { email } });
      return !!user;
   }

   /**
    * Cria um novo usuário com o e-mail e senha fornecidos. 
    * Se o e-mail já estiver em uso, lança uma exceção de conflito.
    * @param dto - Objeto contendo o e-mail e a senha do usuário.
    * @throws ConflictException se o e-mail já estiver em uso.
    * @return O usuário criado, sem a senha.
    */

   async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
      const { email, password } = dto;

      const emailExists = await this.emailExists(email);

      if (emailExists) {
         throw new ConflictException('E-mail já está em uso.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
         data: {
            email,
            password: hashedPassword,
         },
      });

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
   }
}
