//@ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { RootComponent } from './RootComponent';

export function updateUI() { 
	// 获得 React 渲染根节点
	let reactRoot = document.getElementById('root');
	return new Promise((resolve, reject) => {
		// 重新绘制 RootComponent 组件
		//@ts-ignore
		try { ReactDOM.render(<RootComponent />, reactRoot, resolve); }
		catch (ex) { return reject(ex); }
	});
}
