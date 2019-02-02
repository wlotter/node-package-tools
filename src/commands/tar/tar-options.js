const options = {
	's': {
		alias: 'src',
		describe: 'src directories for the tarring',
		type: 'string',
		array: true,
		global: false
	},
	'n': {
		alias: 'name',
		describe: 'name of the tar',
		type: 'string',
		global: false
	}
}

export default options;