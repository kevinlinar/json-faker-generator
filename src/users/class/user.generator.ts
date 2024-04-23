import { User } from '@users/interfaces/user';
import { faker } from '@faker-js/faker';

export class UsersGenerator {
	static generateUsers(count: number): User[] {
		const users: User[] = [];
		for (let i = 0; i < count; i++) {
			users.push({
				id: i,
				name: faker.person.fullName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				address: {
					street: faker.location.streetAddress(),
					suite: faker.location.secondaryAddress(),
					city: faker.location.city(),
					zipCode: faker.location.zipCode(),
					geo: {
						lat: faker.location.latitude(),
						lng: faker.location.longitude(),
					},
				},
				phone: faker.phone.number(),
				website: faker.internet.url(),
				company: {
					name: faker.company.name(),
					catchPhrase: faker.company.catchPhrase(),
					buzzPhrase: faker.company.buzzPhrase(),
				},
			});
		}
		return users;
	}
}
