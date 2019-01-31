import * as ConfigIO from '../../configuration/configuration-io';
import Logger from '../../logger';

const logger = new Logger();

export default function config(argv) {
	const option = argv.option;
	if (!option) {
		logger.error('an option needs to be supplied');
		return;
	}
	if (!ConfigIO.doesConfigExist(option)) {
		logger.error('no config option ' + option);
		return;
	}
	const configuration = ConfigIO.getConfig();
	console.log(configuration[option])
}