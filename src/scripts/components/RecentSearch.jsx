//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString, getI18N, setI18N } from '../i18n/index';
import { getRecentSearch } from '../browser_storage/recent_search';
import { searchBooks } from '../api/api_search_books';

export function RecentSearch(props) {
	return <div className="recent-search-container d-flex flex-column align-items-center mt-5">
		<div className="text-primary title mb-2"><b>{getString('recentSearch')}</b></div>	
		{getRecentSearch().map((recent,i) => 
			<a key={i} onClick={(event) => { event.preventDefault(); searchBooks(recent, 1); }}
				className="btn btn-link hvr-grow text-muted">{recent}</a>)}
	</div>;
}