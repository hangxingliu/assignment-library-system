//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString, getI18N, setI18N } from '../i18n/index';

/** @type {BookItem} */
const DEFAULT_BOOK_ITEM = null;

/**
 * @augments {React.Component<BookResultItemComponentProps, {}>} 
 */
export class BookResultItem extends React.Component{
	constructor(props) { 
		super(props);
		this.state = { expand: false };

		this.toggleExpandContent = this.toggleExpandContent.bind(this);
	}
	toggleExpandContent() { this.setState({ expand: !this.state.expand }); }

	componentWillReceiveProps(newProps) { 
		this.setState({ expand: false });
	}

	render() {
		let { keyword , book } = this.props;
		let statusColor = "text-success";
		let rentableCount = book.storages.filter(s => s.rentable).length;
		if (rentableCount == 0)
			statusColor = "text-danger";

		return <div className="row w-100 hvr-shadow book-item">
			<div className="col-12">
				<div className="d-flex justify-content-between py-4">
					<div className="book-item-left d-inline-flex flex-column cursor-pointer"
						onClick={this.toggleExpandContent}>
						<div className="d-block">
							<a className="h3 text-primary"> {book.title} </a>
							{book.version ? <a className="h5 text-primary">({book.version})</a> : null}
						</div>
						<div className="mt-1 mb-2 d-flex justify-content-start align-items-baseline">
							<div className="">
								{book.categories.map((c, i) =>
									<span key={i} className="badge badge-info mx-1">{c}</span>)}
							</div>
							<div className="ml-2 text-muted">
								<small>ISBN: <b>{book.isbn}</b></small>
							</div>
						</div>
						<div className="text-muted mt-1 mb-3" style={{ fontSize: "0.8em" }}>
							{book.brief}
						</div>
						<div className="author-and-publisher d-flex d-inline-flex justify-content-start align-items-center">
							<div className="text-info">
								<i className="iconfont icon-ren"></i>
								<span className="ml-1">{book.author}</span>
							</div>
							<div className="text-muted ml-3">
								<i className="iconfont icon-bookmark"></i>
								<span> {book.publisher}</span>
							</div>
						</div>
					</div>
					<div className={"book-item-right ml-3" +
						" d-inline-flex flex-column justify-content-between align-items-end"}>

						<div style={{ width: "10px", height: '10px' }}></div>
						<div className="mb-4">
							<a className="link-to-douban hvr-grow-rotate" target="_blank"
								href={`https://book.douban.com/subject_search?search_text=${book.isbn}`}>
								<img src="images/douban.svg" />
							</a>
						</div>
						<div className={statusColor + " storage-status cursor-pointer"}
							onClick={this.toggleExpandContent}>
							<i className="iconfont icon-book"></i>
							<span dangerouslySetInnerHTML={{
								__html: getString('storageStatus',
									book.storages.length,
									rentableCount)
							}}>
							</span>
						</div>
					</div>
				</div>
			</div>
			{this.state.expand && book.storages.length ?
				<div className="col-12">
					<div className="book-expand-content">
						<table className="table table-hover">
							<thead>
								<tr className="table-success">
									<th scope="col">{getString('barCode')}</th>
									<th scope="col">{getString('indexNo')}</th>
									<th scope="col">{getString('location')}</th>
									<th scope="col">{getString('status')}</th>
								</tr>
							</thead>
							<tbody>
								{book.storages.map((storage,i) => 
									<tr key={i} className={storage.rentable ? "table-primary" :"table-secondary"}>
										<th scope="row">{storage.barCode}</th>
										<td>{storage.indexNo}</td>
										<td>{storage.location}</td>
										<td>{storage.status}</td>
									</tr>)}
							</tbody>
						</table>	
					</div>
				</div> : null}
		</div>;
	}
}