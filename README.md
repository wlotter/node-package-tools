Package Template Tool
=====================

Pet CLI project for dealing with a package template repository.

User Guide
----------------

Run `npt --help` or `npt [command] --help` to show help (argument information and command summaries).

Create a npt.json in the root of your project. This will happen automatically if you use `npt config` to set a config property.

| Command | Use  |
| ------- | ---- |
| config  | Read and set configuration properties |
| tar     | Create a tarball according to configuration or command line arguments |

Development
-----------

To build use `npm run babel`.

For testing, run `npm link` in the project root. This will create symlinks to the package and it's executable globally (see [npm link](https://docs.npmjs.com/cli/link.html)). Then you can run the scripts specified in the package.json bin property from anywhere.

Use `npm run babel:watch` when working on the project to recompile as you go!

When you're done, run `npm unlink` in the project to remove these symlinks!

Dependency Docs
---------------

| Package   | Link |
| --------- | ---- |
| yargs     | [npm yargs](https://www.npmjs.com/package/yargs) |
| chalk     | [npm chalk](https://www.npmjs.com/package/chalk) |
| tar       | [npm tar](https://www.npmjs.com/package/tar)     |

Dev Dependency Docs
---------------

| Package   | Link |
| --------- | ---- |
| chokidar  | [npm chokidar](https://www.npmjs.com/package/chokidar) |