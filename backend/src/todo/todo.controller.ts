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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('todo')
@Controller('todos')
export class TodoController {
   constructor(private readonly todosService: TodoService) {}

   @Post()
   create(@Body() dto: CreateTodoDto, @Request() req) {
      return this.todosService.create(req.user.userId, dto);
   }

   @Get()
   findAll(@Request() req) {
      return this.todosService.findAll(req.user.userId);
   }

   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
      return this.todosService.findOne(id, req.user.userId);
   }

   @Patch(':id')
   update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTodoDto, @Request() req) {
      return this.todosService.update(id, req.user.userId, dto);
   }

   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
      return this.todosService.remove(id, req.user.userId);
   }
}
