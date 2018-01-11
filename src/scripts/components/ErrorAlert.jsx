//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString } from '../i18n/index';

/** @type {string|Error} */
const DEFAULT_ERROR = null;

/** @type {(event: React.MouseEvent<HTMLAnchorElement>) => any} */
const DEFAULT_ON_RETRY = null;

export function ErrorAlert({
	title = '',
	error = DEFAULT_ERROR,
	onRetry = DEFAULT_ON_RETRY,
	dismissible = false
}) { 
	//@ts-ignore
	let msg = error.message || error;
	return <div className={`alert ${dismissible?" alert-dismissible ":" "} alert-danger`}>
		{dismissible ? <button type="button" className="close" data-dismiss="alert">×</button> : null}
		<strong>{title}</strong> 
		<p>{msg}</p>
		{onRetry ? <div className="text-right">
			<a onClick={onRetry} className="alert-link" style={{cursor: "pointer"}}>
				{getString('retry')}
			</a> 
		</div> : null}
  </div>;
}