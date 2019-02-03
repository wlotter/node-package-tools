const options = {
	's': {
		alias: 'src',
		describe: 'Files and directories to add to the tarball',
		type: 'string',
		array: true,
		global: false
	},
	'n': {
		alias: 'name',
		describe: 'Name of the tarball to be created',
		type: 'string',
		global: false
	}
}

export default options;