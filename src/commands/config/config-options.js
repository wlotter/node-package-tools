const options = {
	's': {
		alias: 'set',
		describe: 'set config option to provided value',
		type: 'string',
		array: true,
		global: false
	},
	'a': {
		alias: 'all',
		describe: 'print all config',
		type: 'boolean',
		global: false,
		conflicts: 's'
	},
	't': {
		alias: 'test',
		describe: 'test config',
		type: 'string',
		array: true,
		global: false,
		conflicts: ['s', 'a']
	}
}

export default options;
