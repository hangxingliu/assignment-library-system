
type BookStorageItem = {
	indexNo: string;
	barCode: string;
	location: string;
	rentable: boolean;
	status: string;
};
type BookItem = {
	title: string;
	author: string;
	publisher: string;
	categories: string[];
	isbn: string;
	version: string;
	brief: string;
	storages: BookStorageItem[];
};

interface PagedAPIResponse<T> {
	content: T[];
	totalPages: number;
	totalElements: number;
	size: number;
	last: boolean;
	first: boolean;
	number: number;
};

type PagedAPIResponseAny = PagedAPIResponse<any>;
type PagedAPIResponseBook = PagedAPIResponse<BookItem>;

type LastSearchBooksContext = {
	error: string | Error;
	query: string;
	page: number;
	response: PagedAPIResponseBook
};

type BookResultItemComponentProps = {
	keyword: string;
	book: BookItem;
}
