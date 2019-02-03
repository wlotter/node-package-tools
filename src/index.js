#!/usr/bin/env node

import globalOptions from './global-options';

import {config, tar} from './commands/commands';

import configOptions from './commands/config/config-options';
import tarOptions from './commands/tar/tar-options';

const CONFIG_DESC = 'Read and edit configuration from npt.json';
const TAR_DESC = 'Create a tarball according to npt.json settings or arguments';

require('yargs')
  .options(globalOptions)
  .command('config [option]', CONFIG_DESC, yargs => yargs
    .positional('option', {
      describe: 'config option to read or modify',
      type: 'string'
    }).options(configOptions)
  , config)
  .command('tar', TAR_DESC,  yargs => yargs
    .options(tarOptions)
  , tar)
  .argv;