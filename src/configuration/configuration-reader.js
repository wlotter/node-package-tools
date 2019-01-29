import {readFileSync} from 'fs';
import {join} from 'path';

const defaultConfigPath = join(__dirname, '..', '..', 'config', 'default-config.json');
const configPath = join(__dirname, '..', '..', 'config', 'config.json');;

function defaultConfig() {
	return JSON.parse(readFileSync(defaultConfigPath))
}

export function config() {
	return {...defaultConfig(), ...JSON.parse(readFileSync(configPath))}
}

export function doesConfigExist(configOption) {
	const existingConfig = Object.keys(defaultConfig());
	return existingConfig.includes(configOption);
}