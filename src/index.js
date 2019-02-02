#!/usr/bin/env node

import globalOptions from './global-options';

import {config, tar} from './commands/commands';

import configOptions from './commands/config/config-options';
import tarOptions from './commands/tar/tar-options';

require('yargs')
	.options(globalOptions)
  .command('config [option]', 'read and edit config', yargs => yargs
      .positional('option', {
        describe: 'config option to modify',
        type: 'string'
      }).options(configOptions)
	, config)
	.command('tar', 'create a tarball',  yargs => yargs
		.options(tarOptions)
	, tar)
  .argv