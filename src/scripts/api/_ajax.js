//@ts-check
/// <reference path="../index.d.ts" />

export const x_www_form_urlencoded = 'application/x-www-form-urlencoded; charset=UTF-8';

/**
 * @param {string} method
 * @param {string} url 
 * @param {any} data 
 * @param {string} [sendDataType] Request Body Content-type
 * @returns {Promise<{status: number; result: string}>}
 */
export function ajax(method, url, data = null,
	sendDataType = '', allowedStatusCode = [200] ) { 
	
	return new Promise((resolve, reject) => {
		// 是否使用了 XDomainRequest 而不是 XMLHttpRequest
		let isXDomainRequest = false;
		let xhr = new XMLHttpRequest();

		// For IE8/IE9 Cross domain request:
		// 为了兼容IE8/IE9 的跨域问题:
		//@ts-ignore
		if (typeof XDomainRequest != 'undefined') { 
			//@ts-ignore			
			xhr = new XDomainRequest();
			isXDomainRequest = true;
		}
		
		xhr.open(method, url);
		if (sendDataType)
			xhr.setRequestHeader("Content-type", sendDataType);
		xhr.onload = () => {
			// fake status 200 for XDomainRequest(without status field)
			if (isXDomainRequest)
				return resolve({ status: 200, result: xhr.responseText });
			
			if (xhr.readyState != 4 || allowedStatusCode.indexOf(xhr.status) < 0 )
				return onError();
			resolve({ status: xhr.status, result: xhr.responseText });
		}
		xhr.onerror = onError;
		xhr.send(data);

		function onError() {
			reject(`XMLHttpRequest failed! readyState: ${xhr.readyState}; ` +
				`xhr.status: ${xhr.status || ""} ${xhr.statusText || ""}`);}
	});
}

/**
 * @param {string} method
 * @param {string} url 
 * @param {any} data 
 * @param {string} [sendDataType] Request Body Content-type
 * @returns {Promise<{status: number; result: any}>}
 */
export function ajaxJSON(method, url, data = null,
	sendDataType = '', allowedStatusCode = [200]) { 
	return ajax(method, url, data, sendDataType, allowedStatusCode).then(body => {
		try {
			return Promise.resolve({ status: body.status, result: JSON.parse(body.result) });
		} catch (ex) { 
			return Promise.reject(`Invalid JSON object: ${url}`);
		}
	});
}

/**
 * @param {string} url 
 * @returns {Promise<{status: number; result: any}>}
 */
export function ajaxGetJSON(url, allowedStatusCode = [200]) {
	return ajaxJSON("GET", url, null, null, allowedStatusCode);
}

export function ajaxMockDelay(min, max) { 
	return new Promise((resolve) => {
		let delay = min + (Math.random() * Math.abs(max - min));
		if (delay < 15) delay = 15;
		setTimeout(resolve, delay);
	});
}

export function ajaxMockFailed(percent) { 
	return new Promise((resolve, reject) => 
		Math.random() > percent ? resolve(true) : reject(`Network broken! (mock)`));
}