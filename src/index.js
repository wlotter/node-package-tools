#!/usr/bin/env node

import globalOptions from './global-options';

import {config, tar, install} from './commands/commands';

import configOptions from './commands/config/config-options';
import tarOptions from './commands/tar/tar-options';
import installOptions from './commands/install/install-options';

const CONFIG_DESC = 'Read and edit configuration from npt.json';
const TAR_DESC = 'Create a tarball according to npt.json settings or arguments';
const INSTALL_DESC = 'NPM install a tarball package from a configured repository';

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
  .command('install', INSTALL_DESC, yargs => yargs
    .options(installOptions)
  , install)
  .argv;