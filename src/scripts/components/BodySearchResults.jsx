//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString, getI18N, setI18N } from '../i18n/index';
import { Loading } from './Loading';
import { ErrorAlert } from './ErrorAlert';
import { searchBooksRetry, getLastSearchBooks, searchBooks } from '../api/api_search_books';
import { Pagination } from './Pagination';
import { BookResultItem } from './BookResultItem';

/** @type {PagedAPIResponseBook} */
const DEFAULT_BOOKS_RESPONSE = null;
/** @type {string|Error} */
const DEFAULT_SEARCH_ERROR = null;

function onSearch() { 
	let keyword = String($('#miniSearchBox').val()).trim();
	if (!keyword)
		return;
	
	searchBooks(keyword, 1);
}

export function BodySearchResults({ 
	page = 1,
	keyword = "",
	booksResponse = DEFAULT_BOOKS_RESPONSE,
	searchError = DEFAULT_SEARCH_ERROR,
}) {
	return <div>
		<div className="search-results-top-container">
			<div id="logoContainer" className="hvr-rotate">
				<img src="images/banner.svg" />
			</div>
			<form id="miniSearchBoxContainer"
				onSubmit={event => { event.preventDefault(); onSearch(); }}>
				<input type="search" className="form-control"
					id="miniSearchBox" name="miniSearchBox"
					aria-describedby="searchBox"
					placeholder={getString('searchPlaceHolder')}
					defaultValue={keyword}/>
				<button id="miniSearchBtn" type="submit" className="btn btn-link hvr-forward">
					<i className="iconfont icon-magnifier"></i>
				</button>
			</form>
		</div>
		<div className="search-results-container">
			<div className="container">
				{booksResponse
					? <div>
						<div className="row" style={{ paddingTop: '20px' }}>
							<div className="col-12">
								{getString('matchedBooksReport',
									booksResponse.totalElements,
									page,
									booksResponse.totalPages)}
							</div>
						</div>
						{booksResponse.content.map((book, i) =>
							<BookResultItem key={i} keyword={keyword} book={book} />)}
						<div className="row mt-4 pb-5">
							<div className="col-12 center-pagination-container">
								<Pagination page={page} keyword={keyword}
									totalPages={booksResponse.totalPages}
									first={booksResponse.first} last={booksResponse.last}/>
							</div>
						</div>
					</div>	
					: <div className="row justify-content-center" style={{ paddingTop: '50px' }}>
						{searchError
							? <div className="col-12 col-lg-8">
								<ErrorAlert title={getString('networkError')}
									error={searchError}	
									onRetry={event => { event.preventDefault(); searchBooksRetry(); }} />
							</div>
							: <div className="col-12">
								<Loading />
							</div>}
					</div>}
			</div>	
		</div>
	</div>;
}