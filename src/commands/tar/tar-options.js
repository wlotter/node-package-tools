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
  },
  'd': {
    alias: 'deploy',
    describe: 'Deploy to configured push repository',
    type: 'boolean',
    global: false
  }
};

export default options;