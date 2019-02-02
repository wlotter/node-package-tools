import Tar from 'tar';

import Config from '../../configuration/io';
import Logger from '../../logger';

const TAR_REGEX = /^.*\.(tgz|tar\.gz)$/

export default function tar(argv) {
	const {name, src} = argv;
	const tarName = name ? name : resolveTarName();
	const tarSrc = src ? src : Config.read('tar.src');

	if (!TAR_REGEX.test(tarName)) {
		Logger.warn(tarName + ' does not have an appropriate file extension!')
	}

	Tar.create({
		gzip: true,
		file: tarName,
		sync: true
	}, tarSrc);

	Logger.result('Created ' + tarName);
}

function resolveTarName() {
	if (Config.read('tar.name')) return Config.read('tar.name');

	Logger.debug('No configured tar/name - resolving from package info...')

	const packageInfo = Config.getPackageInfo();
	return packageInfo.name + '-' + packageInfo.version + '.tgz';
}