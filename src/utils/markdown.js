"use strict";

const showdown = require( "showdown" );

const convert = markdown => {
	const converter = new showdown.Converter();
	let html = converter.makeHtml( markdown );
	const regex = /<h2 id="([^"]*)">/gm;
	const matches = html.match( regex );
	for( let i = 0; i < matches.length; i++ ) {
		html = html.replace( matches[i], `${ matches[i] }<a name="${ i }"></a>` );
	}
	html += "<p>&nbsp;</p>".repeat( 10 );
	return html;
};

module.exports = {
	convert
};
