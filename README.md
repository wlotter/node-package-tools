Package Template Tool
=====================

Pet CLI project for dealing with a package template repository.

Development
-----------

To build use:

```
npm run babel
```

For testing, run

```
npm link
```

in the project root. This will create symlinks to the package and it's executable globally (see [npm link](https://docs.npmjs.com/cli/link.html)). Then you can run the scripts specified in the package.json bin property from anywhere.

Run

```
npm unlink
```

in the project link when you're done to remove these symlinks!