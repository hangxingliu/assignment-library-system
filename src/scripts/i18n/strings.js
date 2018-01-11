//@ts-check

// name: [english, chinese]
/** @type {{[name: string]: (string|Function)[]}} */
export const STRINGS_EN_ZH_MAP = {
	title: ["A Brilliant OPAC ", "一个不错的图书检索系统"],
	searchPlaceHolder: ["Book title/Author/ISBN", "图书标题/作者/ISBN"],
	retry: ["Retry", "重试"],
	unknownError: ["Unknown Error", "未知错误"],
	networkError: ["Network Error", "网络错误"],
	indexNo: ["Index No.", "索书号"],
	barCode: ["Bar Code", "条码号"],
	location: ["Location", "位置"],
	status: ["Status", "状态"],
	recentSearch: ["Recent Search:", "近期搜索:"],
	iconFrom: ["Icons from ", "图标来自 "],
	fontFrom: ["Web fonts from ", "Web字体来自 "],
	themeFrom: ["Theme Based on ", "样式基于 "],
	and: [" and ", " 和 "],
	license: ["Code released under the ", "代码开源协议: "],

	matchedBooksReport: [
		(c, p, pAll) => `Matched ${c} results in ${pAll} pages. Current page: ${p}.`,
		(c, p, pAll) => `匹配到 ${c} 个结果 共 ${pAll} 页. 目前在第 ${p} 页.`
	],
	storageStatus: [
		(all, has) => `Holding: <b>${all}</b> / Rentable: <b>${has}</b>`,
		(all, has) => `馆藏: <b>${all}</b> 本 / 可借: <b>${has}</b> 本`
	]
};