import * as ConfigIO from '../../configuration/configuration-io';
import Logger from '../../logger';
import Tar from 'tar';

const logger = new Logger();

export default function tar(argv) {
	const config = ConfigIO.getConfig();
	console.log(config['build-src']);

	Tar.create({
		gzip: true,
		file: 'my-tarball.tgz',
		sync: true
	}, config['build-src']);
}