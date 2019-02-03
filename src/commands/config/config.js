import Config from '../../configuration/io';
import validate from '../../configuration/validator';

import Logger from '../../logger';

export default function config(argv) {
	const option = argv.option;

	if (argv.all) {
		Logger.result(JSON.stringify(Config.getConfig(), null, '\t'));
		return;
	}

	if (!option) {
		Logger.error('an option needs to be supplied');
		return;
	}

	if (argv.delete) {
		Config.delete(option);
		return;
	}

	if (argv.s || argv.t) {
		const value = argv.s ? argv.s : argv.t;
		const isValid = validate(option, value);

		if (!isValid) {
			Logger.result('Invalid config value');
			return;
		}

		argv.s && Config.write(option, value);
	} else {
		Logger.result(Config.read(option));
	}
}
