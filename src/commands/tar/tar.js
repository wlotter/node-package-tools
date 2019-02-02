import Tar from 'tar';

import * as ConfigIO from '../../configuration/configuration-io';
import Logger from '../../logger';

const logger = new Logger();

export default function tar(argv) {
	const config = ConfigIO.getConfig();

	const {n, s} = argv;
	const tarName = n ? n : resolveTarNameFromConfig(config);
	const tarSrc = s ? s : config['tar/src'];

	Tar.create({
		gzip: true,
		file: tarName,
		sync: true
	}, tarSrc);
}

function resolveTarNameFromConfig(config) {
	if (config['tar/name']) return config['tar/name'];

	const packageInfo = ConfigIO.getPackageInfo();
	return packageInfo.name + '-' + packageInfo.version + '.tgz';
}