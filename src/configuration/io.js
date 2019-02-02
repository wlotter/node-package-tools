import {readFileSync, writeFileSync, existsSync, openSync} from 'fs';
import {join} from 'path';

import Logger from '../logger';

import {getSpecification} from './validator';

const CONFIG_NAME = 'npt.json'
const configPath = join(CONFIG_NAME);

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
		const splitKey = key.split('.');
		const highestDepthKey = splitKey.pop();

		const nestedConfig = splitKey.reduce((config, key) => {
			if (!config[key]) config[key] = {};
			return config[key];		
		}, this.config);

		const spec = getSpecification(key);
		nestedConfig[highestDepthKey] = spec.type === 'array' ? value : value[0];
	}

	getConfig() {
		if (this.needsRefresh) this.refresh();
		return this.config;
	}

	read(key) {
		if (this.needsRefresh) this.refresh();
		
		const splitKey = key.split('.');
		let value = null;
		try {
			value = splitKey.reduce((config, key) => {
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
		this.needsRefresh = true;
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
