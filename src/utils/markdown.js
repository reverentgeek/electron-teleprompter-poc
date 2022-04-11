"use strict";

const showdown = require( "showdown" );

const convert = markdown => {
	const converter = new showdown.Converter();
	return converter.makeHtml( markdown );
};

module.exports = {
	convert
};
