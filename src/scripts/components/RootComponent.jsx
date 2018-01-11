//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { Navbar } from './Navbar';
import { BodyHome } from './BodyHome';
import { BodySearchResults } from './BodySearchResults';
import { getLastSearchBooks, searchBooks } from '../api/api_search_books';
import { PageFooter } from './PageFooter';

let isFirstRender = true;
const DEFAULT_ROUTER_NAME = 'index';
function getRouter() { 
	let match = location.hash.replace(/^#/, '').match(/^([\w\-]+)(?:\/(.+))?$/);
	if (!match) return { name: DEFAULT_ROUTER_NAME };
	return { name: match[1], param: decodeURIComponent(match[2]) };
}

function getBodyComponent() { 
	let { name, param } = getRouter();
	if (name == 'book') {
		return 
	} else if (name == 'search') {
		let match = param.match(/(\d+)\/(.+)/);
		if (match) {
			let page = parseInt(match[1]),
				keyword = match[2];
			
			if (isFirstRender)
				process.nextTick(() => searchBooks(keyword, page));
			
			let lastSearch = getLastSearchBooks();
			console.log(lastSearch)
			return <BodySearchResults {...{page, keyword}}
				booksResponse={lastSearch.response}
				searchError={lastSearch.error}/>
		}
	} 
	// index
	return <BodyHome />
}

export function RootComponent({ 
	attr = null
}) { 
	let body = getBodyComponent();
	isFirstRender = false;

	return [
		<Navbar key="navbar" />,
		<div key="body" className="body-container">{body}</div>,
		<PageFooter key="foot" />
	];
}