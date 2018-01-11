//@ts-check
/// <reference path="../index.d.ts" />

/** @returns {BookItem} */
export function createBookItemFromResponseItem(item) { 
	if (!item)
		return null;
	
	let title_author = (item['题名/责任者'] || [])
		.join('')
		.split(/\s*\/\s*/)
		.map(v => v.trim());
	let author2 = (item['个人责任者'] || []).join('');
	let isbn_price = (item['ISBN及定价'] || [])
		.join('')
		.split(/[\s\/]+/)
		.map(v => v.trim())
		.filter(v => v);

	return {
		title: title_author[0] || "",
		author: title_author[1] || author2,
		publisher: (item['出版发行项'] || []).join(''),
		categories: (item['学科主题'] || []),
		isbn: isbn_price[0] || "",
		version: (item['版本说明'] || []).join(''),
		brief: ([item['提要文摘附注'], item['一般附注']]
			.filter(a => Array.isArray(a) && a.length > 0)[0] || [])
			.join(''),
		storages: (item['storages'] || []).map(storage => {
			let status = (storage['书刊状态'] || "").trim();
			let location = storage['校区-馆藏地'];
			if (!location && storage['密集架号'])
				location = `密集书库: ${storage['密集架号']}`;
			return {
				indexNo: storage['索书号'] || "",
				barCode: storage['条码号'] || "",
				location: location || "",
				rentable: status == "可借",
				status
			};
		})
	};
}

/**
 * @param {PagedAPIResponseAny} response 
 * @returns {PagedAPIResponseBook}
 */
export function createBooksAPIResponse(response) { 
	response.content = response.content.map(item =>
		createBookItemFromResponseItem(item));
	return response;
}