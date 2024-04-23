export interface DataTablesResponse<T> {
	recordsTotal: number;
	recordsFiltered: number;
	data: T[];
}
