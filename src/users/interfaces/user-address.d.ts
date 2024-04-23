import { Geo } from '@shared/interfaces/geo';

export interface Address {
	street: string;
	suite: string;
	city: string;
	zipCode: string;
	geo: Geo;
}
