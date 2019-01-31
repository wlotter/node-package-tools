import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

const defaultConfigPath = join(__dirname, '..', '..', 'config', 'default-config.json');
const configPath = join(__dirname, '..', '..', 'config', 'config.json');;

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
	return {...getDefaultConfig(), ...JSON.parse(readFileSync(configPath))}
}

export function doesConfigExist(configOption) {
	const existingConfig = Object.keys(getDefaultConfig());
	return existingConfig.includes(configOption);
}

export function writeJsonToConfig(jsonObj) {
	if (!isConfigValid(jsonObj)) throw new Error('Invalid configuration option');
	writeFileSync(configPath, JSON.stringify(jsonObj));
}

export function getCustomConfig() {
	return JSON.parse(readFileSync(configPath));
}
