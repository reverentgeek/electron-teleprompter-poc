"use strict";

const { app } = require( "electron" );
const fs = require( "fs-extra" );
const path = require( "path" );

module.exports = ( defaultConfig ) => {
	const dataDir = app.getPath( "userData" );
	const configFile = path.join( dataDir, "app-config.json" );

	const loadConfig = async () => {
		try {
			const config = await fs.readJson( configFile );
			return Object.assign( {}, defaultConfig, config );
		} catch ( err ) {
			console.log( err );
			return defaultConfig;
		}
	};

	const saveConfig = async ( config ) => {
		await fs.writeJson( configFile, config );
	};

	return {
		loadConfig,
		saveConfig
	};
};
