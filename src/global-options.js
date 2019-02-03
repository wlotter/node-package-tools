const options = {
  'v': {
    alias: 'verbose',
    describe: 'verbose logging; equivalent to --logger=INFO',
    type: 'boolean',
    conflicts: 'logger'
  },
  'logger': {
    type: 'string',
    describe: 'Set the logging level to use for this command',
    choices: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'],
    conflicts: 'v'
  }
};

export default options;