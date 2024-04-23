import { DTDataRequestColumn, DTDataRequestOrder } from '@shared/interfaces/data-tables';
import { deepAccess } from './deep-access';

export const dtSort = <T>(columns: DTDataRequestColumn[], order: DTDataRequestOrder[], rows: T[]): T[] => {
	const multiSortComparator = (a: T, b: T): number => {
		for (const item of order) {
			if (!columns[item.column]) continue;
			const { data } = columns[item.column];
			if (!data) continue;
			const dirMultiplier = item.dir === 'asc' ? 1 : -1;
			const aValue = deepAccess(a, data);
			const bValue = deepAccess(b, data);

			if (aValue == null && bValue == null) continue;
			if (aValue == null) return 1 * dirMultiplier;
			if (bValue == null) return -1 * dirMultiplier;

			if (aValue < bValue) return -1 * dirMultiplier;
			if (aValue > bValue) return 1 * dirMultiplier;
		}
		return 0;
	};
	const sortedData = [...rows].sort(multiSortComparator);
	return sortedData;
};
