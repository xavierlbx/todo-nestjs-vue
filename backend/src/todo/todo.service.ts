import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
   constructor(private prisma: PrismaService) {}

   async create(userId: number, dto: CreateTodoDto) {
      return this.prisma.todo.create({
         data: {
            ...dto,
            userId,
         },
      });
   }

   async findAll(userId: number) {
      return this.prisma.todo.findMany({
         where: { userId },
         orderBy: { createdAt: 'desc' },
      });
   }

   async findOne(id: number, userId: number) {
      const todo = await this.prisma.todo.findFirst({
         where: { id, userId },
      });

      if (!todo) throw new NotFoundException('Todo não encontrado');
      return todo;
   }

   async update(id: number, userId: number, dto: UpdateTodoDto) {
      await this.findOne(id, userId); // garante que pertence ao user
      return this.prisma.todo.update({
         where: { id },
         data: dto,
      });
   }

   async remove(id: number, userId: number) {
      await this.findOne(id, userId); // garante que pertence ao user
      return this.prisma.todo.delete({
         where: { id },
      });
   }
}
