//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { updateUI } from './components';
import { searchBooks } from '../api/api_search_books';

const PAGINATION_DELTA = 3;

export function Pagination({
	keyword, page, totalPages, first, last
}) {
	return <ul className="pagination">
		<li className={"page-item " + (first ? "disabled" : "")}>
			<a className="page-link" onClick={first?null:generateOnClick(keyword, 1)}>&laquo;</a>
		</li>
		{generateButtons(keyword, page, totalPages)}
		<li className={"page-item " + (last ? "disabled" : "")}>
			<a className="page-link" onClick={last?null:generateOnClick(keyword, totalPages)}>&raquo;</a>
		</li>
	</ul>;
}

function generateOnClick(keyword, gotoPage) { 
	return event => {
		event.preventDefault();
		searchBooks(keyword, gotoPage);
	};
}

function generateButtons(keyword, page, totalPages) {
	let left = page - PAGINATION_DELTA,
		right = page + PAGINATION_DELTA + 1,
		range = [];

	if (left > 1) range.push(generateDots(1));
	for (let i = 1; i <= totalPages; i++) {
		if (i >= left && i < right) {
			range.push(generateButton(i));
		}
	}
	if (right < totalPages) range.push(generateDots(totalPages));	
	return range;

	function generateDots(key) { 
		return <li key={key} className="page-item disabled">
			<a className="page-link">...</a>
		</li>;
	}
	function generateButton(nowPage) { 
		return <li key={nowPage}
			className={"page-item " + (page == nowPage ? "active " : " ")}>
			<a className="page-link"
				onClick={(page == nowPage ? null : generateOnClick(keyword, nowPage))}>{nowPage}</a>
		</li>;
	}
}