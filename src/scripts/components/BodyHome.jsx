//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString, getI18N, setI18N } from '../i18n/index';
import { searchBooks } from '../api/api_search_books';
import { RecentSearch } from './RecentSearch';

function onSearch() { 
	let keyword = String($('#searchBox').val()).trim();
	if (!keyword)
		return;
	
	searchBooks(keyword, 1);
}

export function BodyHome(props) {
	return <div className="home-search-container">
			<div id="bannerContainer">
				<img src="images/banner.svg" className="hvr-wobble-vertical"/>
			</div>
			<form id="searchBoxContainer" onSubmit={event => {event.preventDefault();onSearch();}}>
				<input type="search" className="form-control"
					id="searchBox" name="searchBox"
					aria-describedby="searchBox"
					placeholder={getString('searchPlaceHolder')}
					autoFocus={true} />
				<button id="searchBtn" type="submit" className="btn btn-link hvr-forward">
					<i className="iconfont icon-magnifier"></i>
				</button>
			</form>
			<RecentSearch />
		</div>;
}