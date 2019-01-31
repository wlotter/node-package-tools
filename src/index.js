#!/usr/bin/env node

import config from './commands/config/config';
import configOptions from './commands/config/config-options';

require('yargs')
  .command('config [option]', 'read and edit config', (yargs) => {
    yargs
      .positional('option', {
        describe: 'config option to modify',
        type: 'string'
      })
	}, config)
	.options(configOptions)
  .argv