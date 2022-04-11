"use strict";

const { app, BrowserWindow, ipcMain } = require( "electron" );
const path = require( "path" );
const state = require( "./utils/state" );

const defaultConfig = { width: 800, height: 600 };

const createWindow = ( config ) => {
	const win = new BrowserWindow( {
		width: config.width,
		height: config.height,
		center: true,
		transparent: true,
		frame: false,
		webPreferences: {
			preload: path.join( __dirname, "client", "teleprompter-preload.js" )
		}
	} );

	win.loadFile( path.join( __dirname, "client", "teleprompter.html" ) );
	return win;
};

const saveState = async ( win, stateManager, config ) => {
	const position = win.getPosition();
	const size = win.getSize();
	const windowConfig = {
		x: position[0],
		y: position[1],
		width: size[0],
		height: size[1]
	};
	if ( !win.isMinimized() && !win.isMaximized() ) {
		Object.assign( config, windowConfig );
	}
	await stateManager.saveConfig( config );
};

app.whenReady().then( async () => {
	const stateManager = state( defaultConfig );
	const config = await stateManager.loadConfig();
	let win = createWindow( config );

	win.on( "close", async () => {
		await saveState( win, stateManager, config );
	} );

	app.on( "activate", () => {
		if ( BrowserWindow.getAllWindows().length === 0 ) {
			win = createWindow( config );
		}
	} );

	app.on( "window-all-closed", () => {
		if ( process.platform !== "darwin" ) app.quit();
	} );
} );

ipcMain.on( "err", ( event, args ) => {
	console.log( event, args );
	// fs.readFile( "path/to/file", ( error, data ) => {
	//   // Do something with file contents

	//   // Send result back to renderer process
	//   win.webContents.send( "fromMain", responseObj );
	// } );
} );

