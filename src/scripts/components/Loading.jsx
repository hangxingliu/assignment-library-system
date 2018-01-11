//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString, getI18N, setI18N } from '../i18n/index';

export function Loading(props) {
	return <div className="loading-container">
		<div className="loading-center">
			<div className="pacman">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>;
}