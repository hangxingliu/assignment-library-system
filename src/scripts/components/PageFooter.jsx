//@ts-check
/// <reference path="../index.d.ts" />

import React from 'react';
import { getString } from '../i18n/index';

export function PageFooter(props) {
	return <div id="footer" className="container mt-5">
		<div className="row">
			<div className="col-12 text-center text-muted">
				<div> {getString('iconFrom')} <Link link="http://www.iconfont.cn/">Iconfont</Link>. </div>
				<div> {getString('fontFrom')} <Link link="https://fonts.google.com/">Google</Link>.</div>
				<div> {getString('themeFrom')}
				<Link link="https://getbootstrap.com">Bootstrap</Link> {getString('and')}
					<Link link="https://bootswatch.com/minty/">Bootswatch Minty</Link>
					.</div>

				<div className="mt-2">
					{getString('license')} <Link link="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3</Link>.
				</div>
			</div>
		</div>
	</div>;
}

function Link({ children, link}) { 
	return <a href={link} target="_blank" rel="nofollow">{children}</a>;
}