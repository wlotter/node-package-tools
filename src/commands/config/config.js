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

	if (argv.s) {
		setConfigInFile(option, argv.s);
	} else {
		writeConfigToConsole(option);
	}
}

function writeConfigToConsole(option) {
	const configuration = ConfigIO.getConfig();
	logger.result(configuration[option]);
}

function setConfigInFile(option, value) {
	const setValue = value.length < 2 ? value[0] : value;

	const customConfiguration = ConfigIO.getCustomConfig();
	customConfiguration[option] = setValue;
	ConfigIO.writeJsonToConfig(customConfiguration);
}