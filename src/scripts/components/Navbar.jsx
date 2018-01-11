//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString, getI18N, setI18N } from '../i18n/index';

export function Navbar(props) {
	return <div className="navbar navbar-expand-sm fixed-top navbar-dark bg-primary">
		<div className="container">
			<a href="#" className="navbar-brand">{getString("title")}</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarResponsive">
				<ul className="navbar-nav"></ul>
				<ul className="nav navbar-nav ml-auto">
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
							Language: <b>{getI18N()}</b> <span className="caret"></span>
						</a>
						<div className="dropdown-menu">
							<a className="dropdown-item" onClick={()=>setI18N("en")}>English</a>
							<a className="dropdown-item" onClick={()=>setI18N("zh-CN")}>简体中文</a>
						</div>
					</li>	
					<li className="nav-item">
						<a className="nav-link" href="https://github.com/hangxingliu" target="_blank">
							Github
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>;
}