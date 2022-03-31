"use strict";

const { app, BrowserWindow } = require( "electron" );
const path = require( "path" );

const createWindow = () => {
	const win = new BrowserWindow( {
		width: 800,
		height: 600,
		center: true,
		transparent: true,
		frame: false,
		webPreferences: {
			preload: path.join( __dirname, "client", "teleprompter-preload.js" )
		}
	} );

	win.loadFile( path.join( __dirname, "client", "teleprompter.html" ) );
};

app.whenReady().then( () => {
	createWindow();

	app.on( "activate", () => {
		if ( BrowserWindow.getAllWindows().length === 0 ) createWindow();
	} );

	app.on( "window-all-closed", () => {
		if ( process.platform !== "darwin" ) app.quit();
	} );
} );

