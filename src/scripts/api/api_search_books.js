//@ts-check
/// <reference path="../index.d.ts" />

const API_SEARCH_BOOKS = 'api/search';

import { isMock, getAPIName } from "./setup";
import { ajaxGetJSON, ajaxMockDelay, ajaxMockFailed } from "./_ajax";
import { createBooksAPIResponse } from "./_response";
import { updateUI } from "../components/components";
import { addRecentSearch } from "../browser_storage/recent_search";

let lastSearchQuery = '', lastSearchPage = 1;
let lastSearchError = null;
/** @type {PagedAPIResponseBook} */
let lastSearchResponse = null;

/** @returns {Promise<PagedAPIResponseBook>} */
function _searchBooks(query = '', page = 1) { 
	lastSearchQuery = query;
	lastSearchPage = page;
	lastSearchResponse = null;
	return (isMock()
		? ajaxMockDelay(100, 500)
			.then(() => ajaxMockFailed(0.1))
			.then(() => ajaxGetJSON(`mock/search-${page == 1 ? 1 : 2}.json`))
		: ajaxGetJSON(`${getAPIName()}/${API_SEARCH_BOOKS}?` +
			`query=${encodeURIComponent(query)}&page=${page}`))
		.then(({ result }) => {
			return Promise.resolve(lastSearchResponse = createBooksAPIResponse(result))
		});
}

export function searchBooks(query = '', page = 1) { 
	addRecentSearch(query);

	location.hash = `#search/${page}/${encodeURIComponent(query)}`;
	lastSearchError = null;

	updateUI().then(() => _searchBooks(query, page))
		.then(() => process.nextTick(updateUI))
		.catch(error => {
			console.error(`search book throw:`, error);
			lastSearchError = error;
			updateUI();
		});
}
export function searchBooksRetry() { 
	console.log(getLastSearchBooks());
	if (lastSearchQuery && lastSearchPage)
		searchBooks(lastSearchQuery, lastSearchPage);
}

/** @returns {LastSearchBooksContext} */
export function getLastSearchBooks() { 
	return {
		query: lastSearchQuery,
		page: lastSearchPage,
		response: lastSearchResponse,
		error: lastSearchError
	};
}

