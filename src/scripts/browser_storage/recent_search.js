//@ts-check
/// <reference path="../index.d.ts" />

const STORAGE_KEY = "opac-recent";

/**
 * 获得最近的搜索记录
 * @returns {string[]}
 */
export function getRecentSearch() { 
	try {
		// 从 localStorage中读取
		let recent = JSON.parse(
			localStorage.getItem(STORAGE_KEY) || "[]");
		// 检查是否是字符串数组
		if (Array.isArray(recent) &&
			recent.filter(it => typeof it != 'string').length == 0)
			return recent;
		return [];
	} catch (ex) { 
		return [];
	}
}

/**
 * 添加一条最近搜索记录 (包含去重操作)
 * @param {string} keyword 
 */
export function addRecentSearch(keyword = '') { 
	let recents = getRecentSearch();
	let newRecents = [keyword];
	for (let recent of recents)
		if (recent != keyword) // 去除重复
			newRecents.push(recent);
	// 只记录最近5条
	newRecents = newRecents.slice(0, 5);
	localStorage.setItem(STORAGE_KEY,
		JSON.stringify(newRecents));
	return newRecents;
}