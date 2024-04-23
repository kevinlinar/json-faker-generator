import { Body, Controller, Delete, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { DataTablesResponse } from '@shared/interfaces/data-tables';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('/:count')
	@HttpCode(201)
	create(@Param('count') count: number) {
		return this.usersService.create(count);
	}

	@Get()
	findAll(): DataTablesResponse<User> {
		const users = this.usersService.findAll();
		return {
			recordsTotal: users.length,
			recordsFiltered: users.length,
			data: users,
		};
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
