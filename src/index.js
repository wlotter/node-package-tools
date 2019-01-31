#!/usr/bin/env node

import config from './commands/config';

require('yargs') // eslint-disable-line
  .command('config [option]', 'read and edit config', (yargs) => {
    yargs
      .positional('option', {
        describe: 'config option to modify',
        type: 'string'
      })
  }, config)
  .argv