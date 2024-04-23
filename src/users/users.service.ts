import { Injectable } from '@nestjs/common';
import { UsersGenerator } from '@users/class/user.generator';
import { User } from '@users/interfaces/user';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileSystemUtils } from '@utils/file-system.utils';
@Injectable()
export class UsersService {
	private readonly basePath = path.join(__dirname, '../../json/users'); // Ajusta la ruta según la estructura del proyecto
	private readonly jsonFilePath = path.join(this.basePath, 'user.json');

	findAll(): User[] {
		if (fs.existsSync(this.jsonFilePath)) {
			const data = fs.readFileSync(this.jsonFilePath, 'utf-8');
			return JSON.parse(data);
		}
		return [];
	}

	create(count: number) {
		FileSystemUtils.ensureDirectoryExistence(this.jsonFilePath);
		const users = UsersGenerator.generateUsers(count);
		fs.writeFileSync(this.jsonFilePath, JSON.stringify(users));
		return 'Ok';
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		console.log(updateUserDto);

		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
