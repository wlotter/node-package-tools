const options = {
	'v': {
		alias: 'verbose',
		describe: 'verbose logging - adds info level logging',
		type: 'boolean',
		conflicts: 'logger'
	},
	'logger': {
		type: 'string',
		choices: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'],
		conflicts: 'v'
	}
}

export default options;