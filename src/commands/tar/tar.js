import Tar from 'tar';

import * as ConfigIO from '../../configuration/configuration-io';
import Logger from '../../logger';

const logger = new Logger();

export default function tar(argv) {
	const config = ConfigIO.getConfig();
	console.log(config);

	const tarName = resolveTarNameFromConfig(config);

	Tar.create({
		gzip: true,
		file: tarName,
		sync: true
	}, config['tar/src']);
}

function resolveTarNameFromConfig(config) {
	if (config['tar/name']) return config['tar/name'];

	const packageInfo = ConfigIO.getPackageInfo();
	return packageInfo.name + '-' + packageInfo.version + '.tgz';
}