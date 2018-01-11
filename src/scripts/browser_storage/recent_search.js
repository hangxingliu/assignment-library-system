//@ts-check
/// <reference path="../index.d.ts" />

const STORAGE_KEY = "opac-recent";

/**
 * @returns {string[]}
 */
export function getRecentSearch() { 
	try {
		let recent = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
		if (Array.isArray(recent) && recent.filter(it => typeof it != 'string').length == 0)
			return recent;
		return [];
	} catch (ex) { 
		return [];
	}
}

export function addRecentSearch(keyword = '') { 
	let recents = getRecentSearch();
	let newRecents = [keyword];
	for (let recent of recents)
		if (recent != keyword)
			newRecents.push(recent);
	newRecents = newRecents.slice(0, 5);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecents));
	return newRecents;
}