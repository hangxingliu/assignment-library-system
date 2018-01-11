//@ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { RootComponent } from './RootComponent';

export function updateUI() { 
	let reactRoot = document.getElementById('root');
	return new Promise((resolve, reject) => {
		//@ts-ignore
		try { ReactDOM.render(<RootComponent />, reactRoot, resolve); }
		catch (ex) { return reject(ex); }
	});
}
