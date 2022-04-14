const { ipcRenderer } = require( "electron" );
const fs = require( "fs-extra" );
const path = require( "path" );
const markdownConverter = require( "../utils/markdown" );

const replaceHtml = ( selector, html ) => {
	const element = document.getElementById( selector );
	if ( element ) element.innerHTML = html;
};

async function getContent() {
	const fileName = path.join( __dirname, "content.md" );
	const markdown = await fs.readFile( fileName, { encoding: "utf-8" } );
	const html = markdownConverter.convert( markdown );
	console.log( html );
	replaceHtml( "md", html );
}

window.addEventListener( "DOMContentLoaded", async () => {
	try {
		await getContent();
	} catch( err ) {
		ipcRenderer.send( "err", err );
	}
} );
