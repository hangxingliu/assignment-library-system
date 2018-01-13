//@ts-check
/// <reference path="../index.d.ts" />

import { STRINGS_EN_ZH_MAP } from "./strings";
import { updateUI } from "../components/components";

let currentLanguage = 1; // 默认简体中文

/** @returns {string} */
export function getI18N() { 
	return currentLanguage == 0 ? "English" : "简体中文";
}
/** @param {"en"|"zh-CN"} language */
export function setI18N(language) { 
	let newLanguage = 0; //en
	if (language == "zh-CN")
		newLanguage = 1;	

	// 如果设置前后语言有变化, 则刷新页面
	if (newLanguage != currentLanguage) { 
		currentLanguage = newLanguage;
		updateUI();
	}
}

/**
 * @param {string} name 
 * @param {any[]} [p]
 * @returns {string}
 */
export function getString(name, ...p) { 
	if (!(name in STRINGS_EN_ZH_MAP)) { 
		// 找不到字段的翻译
		console.error(`Could not found i18n string named ${name}`);
		return name;
	}
	// 默认是字符串
	let str = STRINGS_EN_ZH_MAP[name][currentLanguage];
	// 也可以是字符串格式化函数
	if (typeof str == 'function')
		return str(...p);
	return str;
}
