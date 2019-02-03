const options = {
	's': {
		alias: 'set',
		describe: 'Set config option to a supplied value',
		type: 'string',
		array: true,
		global: false
	},
	'a': {
		alias: 'all',
		describe: 'Print all configuration to command line',
		type: 'boolean',
		global: false,
		conflicts: 's'
	},
	't': {
		alias: 'test',
		describe: 'Test if a supplied config value is valid',
		type: 'string',
		array: true,
		global: false,
		conflicts: ['s', 'a']
	},
	'd': {
		alias: 'delete',
		describe: 'Delete a config option',
		type: 'boolean',
		global: false,
		conflicts: ['s', 't']
	}
}

export default options;
