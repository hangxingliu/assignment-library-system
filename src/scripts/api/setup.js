//@ts-check
/// <reference path="../index.d.ts" />

const MOCK = 'mock';
let API = MOCK;
export function getAPIName() { return API }
export function isMock() { return API == MOCK; }

function parseAPIFromHref() { 
	let hashIndex = location.href.indexOf('#');
	let href = hashIndex >= 0 ? location.href.slice(0, hashIndex) : location.href;
	let match = href.match(/[&\?]api=(.+?)(?:&|$)/);
	return match ? decodeURIComponent(match[1]) : null;
}
function normalizeAPI(uri = '') {
	// relative path
	if (uri.startsWith('/'))
		return uri.replace(/\/$/, '');

	const matcher = /^https?:\/\//
	if (!uri.match(matcher)) {
		let match = location.href.match(matcher) || ['http://'];
		uri = `${match[0]}${uri}`;
	}
	return uri.replace(/\/$/, '');
}

export function setup(defaultAPI = MOCK) { 
	// 从 URL 中解析 API源(API服务器)
	API = parseAPIFromHref();
	if (!API) {
		// 如果没有通过 URL 设置特定的API源, 则选用默认的API源
		// 在开发模式下: 默认的源是 模拟数据.
		API = (process.env.NODE_ENV == "development") ? MOCK : defaultAPI;
	}
	if (API != MOCK)
		API = normalizeAPI(API);
	console.log("API:", API || "current server");
}
