import {
   Controller,
   Get,
   Post,
   Body,
   Param,
   Delete,
   Patch,
   UseGuards,
   Request,
   ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('todo')
@Controller('todos')
export class TodoController {
   constructor(private readonly todosService: TodoService) {}

   private getUserid(req) {
      return req.user.userId;
   }

   @Post()
   @ApiOperation({ summary: 'Cria uma nova tarefa' })
   @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
   create(@Body() dto: CreateTodoDto, @Request() req): Promise<Todo> {
      const userId = this.getUserid(req);
      return this.todosService.create(userId, dto);
   }

   @Get()
   @ApiOperation({ summary: 'Lista todas as tarefas do usuário' })
   @ApiResponse({ status: 200, description: 'Lista de tarefas retornada' })
   findAll(@Request() req): Promise<Todo[]> {
      const userId = this.getUserid(req);
      return this.todosService.findAll(userId);
   }

   @Get(':id')
   @ApiOperation({ summary: 'Busca uma tarefa específica' })
   findOne(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<Todo> {
      const userId = this.getUserid(req);
      return this.todosService.findOne(id, userId);
   }

   @Patch(':id')
   @ApiOperation({ summary: 'Atualiza uma tarefa' })
   update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateTodoDto,
      @Request() req,
   ): Promise<Todo> {
      const userId = this.getUserid(req);
      return this.todosService.update(id, userId, dto);
   }

   @Delete(':id')
   @ApiOperation({ summary: 'Remove uma tarefa' })
   remove(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<Todo> {
      const userId = this.getUserid(req);
      return this.todosService.remove(id, userId);
   }
}
