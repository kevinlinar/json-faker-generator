import { Address } from '@users/interfaces/user-address';
import { Company } from '@users/interfaces/user-company';

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}
