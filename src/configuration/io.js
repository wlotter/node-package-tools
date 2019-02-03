import {readFileSync, writeFileSync, existsSync, openSync} from 'fs';
import {join} from 'path';

import Logger from '../logger';

import {getSpecification} from './validator';

const CONFIG_NAME = 'npt.json'
const configPath = join(CONFIG_NAME);

function splitKey(key) {
	const splitPath = key.split('.');
	const property = splitPath.pop();

	return {
		property,
		splitPath
	}
}

class ConfigLayer {

	constructor() {
		this.needsRefresh = true;
		this.config = {};
	}

	refresh() {
		this.config = existsSync(configPath) ? JSON.parse(readFileSync(configPath)) : {};
		this.needsRefresh = false;
	}

	_writeJsonToConfig(jsonObj) {
		if (!existsSync(configPath)) openSync(configPath, 'w');
		writeFileSync(configPath, JSON.stringify(jsonObj, null, '\t'));
		this.needsRefresh = true;
	}

	_writeKeyOnObj(key, value) {
		const { property, splitPath } = splitKey(key);

		const nestedConfig = this._getNestedConfig(splitPath);

		const spec = getSpecification(key);
		nestedConfig[property] = spec.type === 'array' ? value : value[0];
	}

	_getNestedConfig(keyArray) {
		return keyArray.reduce((config, key) => {
			if (!config[key]) config[key] = {};
			return config[key];		
		}, this.config);
	}

	getConfig() {
		if (this.needsRefresh) this.refresh();
		return this.config;
	}

	read(key) {
		if (this.needsRefresh) this.refresh();
		
		const fullSplitPath = key.split('.');
		let value = null;
		try {
			value = fullSplitPath.reduce((config, key) => {
				if (config[key] === undefined) throw new Error();
				return config[key]
			}, this.config);
		} catch {
			Logger.debug('config key didn\'t exist in config file');
		}
		return value;
	}

	write(key, value) {
		if (this.needsRefresh) this.refresh();

		const array = Array.isArray(key) ? key : [[key, value]];
		array.forEach((kv) => {
			const key = kv[0];
			const value = kv[1];
			this._writeKeyOnObj(key, value);
		});
		this._writeJsonToConfig(this.config);
	}

	delete(key) {
		if (this.needsRefresh) this.refresh();
		
		const { property, splitPath } = splitKey(key);
		const nestedConfig = this._getNestedConfig(splitPath);

		delete nestedConfig[property];

		this._writeJsonToConfig(this.config);
	}

	getPackageInfo() {
		const packageJSON = JSON.parse(readFileSync("package.json"));
		const info = {
			name: packageJSON.name,
			version: packageJSON.version
		}
		return info;
	}

}

export default new ConfigLayer();
