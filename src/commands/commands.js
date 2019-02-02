import Logger, {LEVEL} from '../logger';

import configCommand from './config/config';
import tarCommand from './tar/tar';

function preCommand(argv) {
	if (argv.verbose) Logger.setLevel(LEVEL.INFO);
	if (argv.logger) Logger.setLevel(LEVEL[argv.logger]);
}

function commandify(command) {
	return (argv) => {
		preCommand(argv);
		command(argv);
	}
}

const config = commandify(configCommand);
const tar = commandify(tarCommand);

export {
	config,
	tar
};
