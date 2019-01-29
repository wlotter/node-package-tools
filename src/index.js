#!/usr/bin/env node

import {config, doesConfigExist} from './configuration/configuration-reader'
import Logger from './logger';

const logger = Logger();

require('yargs') // eslint-disable-line
  .command('config [option]', 'read and edit config', (yargs) => {
    yargs
      .positional('option', {
        describe: 'config option to modify',
        type: 'string'
      })
  }, (argv) => {
		const option = argv.option;
		if (!option) {
			logger.error('an option needs to be supplied');
			return;
		}
		if (!doesConfigExist(option)) {
			logger.error('no config option ' + option);
			return;
		}
		const configuration = config();
		console.log(configuration[option])
  })
  .argv