import {readFileSync, writeFileSync, existsSync, openSync} from 'fs';
import {join} from 'path';

const defaultConfigPath = join(__dirname, '..', '..', 'config', 'default-config.json');

const CONFIG_NAME = 'npt.json'
const configPath = join(CONFIG_NAME);;

function getDefaultConfig() {
	return JSON.parse(readFileSync(defaultConfigPath))
}

function isConfigValid(jsonObj) {
	const defaultConfig = getDefaultConfig();
	const defaultConfigKeys = Object.keys(defaultConfig);
	const nonConfigOption = Object.keys(jsonObj).find(element => !defaultConfigKeys.includes(element));
	return nonConfigOption === undefined;
}

export function getConfig() {
	const customConfig = existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : {};
	return {...getDefaultConfig(), ...customConfig}
}

export function doesConfigExist(configOption) {
	const existingConfig = Object.keys(getDefaultConfig());
	return existingConfig.includes(configOption);
}

export function writeJsonToConfig(jsonObj) {
	if (!isConfigValid(jsonObj)) throw new Error('Invalid configuration option');
	if (!existsSync(configPath)) openSync(configPath, 'w');
	writeFileSync(configPath, JSON.stringify(jsonObj, null, '\t'));
}

export function getCustomConfig() {
	return existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : {};
}

export function getPackageInfo() {
	const packageJSON = JSON.parse(readFileSync("package.json"));
	const info = {
		name: packageJSON.name,
		version: packageJSON.version
	}
	return info;
}
