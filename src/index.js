#!/usr/bin/env node

import globalOptions from './global-options';

import config from './commands/config/config';
import configOptions from './commands/config/config-options';

import tar from './commands/tar/tar';
import tarOptions from './commands/tar/tar-options';

require('yargs')
	.options(globalOptions)
  .command('config [option]', 'read and edit config', (yargs) => {
    yargs
      .positional('option', {
        describe: 'config option to modify',
        type: 'string'
      })
	}, config)
	.options(configOptions)
	.command('tar', 'create a tarball', (yargs) => {

	}, tar)
	.options(tarOptions)
  .argv