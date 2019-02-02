import Tar from 'tar';

import * as ConfigIO from '../../configuration/configuration-io';
import Logger from '../../logger';

export default function tar(argv) {
	const config = ConfigIO.getConfig();

	const {name, src} = argv;
	const tarName = name ? name : resolveTarNameFromConfig(config);
	const tarSrc = src ? src : config['tar/src'];

	Tar.create({
		gzip: true,
		file: tarName,
		sync: true
	}, tarSrc);

	Logger.result('Created ' + tarName);
}

function resolveTarNameFromConfig(config) {
	if (config['tar/name']) return config['tar/name'];

	Logger.debug('No configured tar/name - resolving from package info...')

	const packageInfo = ConfigIO.getPackageInfo();
	return packageInfo.name + '-' + packageInfo.version + '.tgz';
}