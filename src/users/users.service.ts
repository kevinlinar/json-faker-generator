import { Injectable } from '@nestjs/common';
import { UsersGenerator } from '@users/class/user.generator';
import { User } from '@users/interfaces/user';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileSystemUtils } from '@utils/file-system.utils';
import { DTDataRequest, DTHttpResponse } from '@shared/interfaces/data-tables';
import { dtSort } from '@utils/dt-sort';
import { dtSearch } from '@utils/dt-search';
@Injectable()
export class UsersService {
	private readonly basePath = path.join(__dirname, '../../json/users'); // Ajusta la ruta según la estructura del proyecto
	private readonly jsonFilePath = path.join(this.basePath, 'user.json');

	findAll(dtParams: DTDataRequest): DTHttpResponse<User> {
		if (!fs.existsSync(this.jsonFilePath)) {
			return {
				recordsTotal: 0,
				recordsFiltered: 0,
				data: [],
			};
		}
		const data = fs.readFileSync(this.jsonFilePath, 'utf-8');
		const usersAll = JSON.parse(data);
		let recordsFiltered = usersAll;
		if (dtParams.search.value.trim()) {
			recordsFiltered = dtSearch(usersAll, dtParams.search.value, dtParams.columns);
		}
		const usersSort = dtSort<User>(dtParams.columns, dtParams.order, recordsFiltered);
		const page = usersSort.slice(dtParams.start, dtParams.start + dtParams.length);
		return {
			recordsTotal: usersAll.length,
			recordsFiltered: recordsFiltered.length,
			data: page,
		};
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
