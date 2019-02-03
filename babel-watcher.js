#!/usr/bin/env node

/* eslint-disable no-console */

// Dev script - I had permission issues when using babels watch option

const Chokidar = require('chokidar');
const spawn = require('child_process').spawn;
const fs = require('fs');

const loud = process.env.SILENT ? false : true; // eslint-disable-line
const writeStdout = (message) => {
  loud && process.stdout.write(message); // eslint-disable-line
};

writeStdout('Babel watcher getting ready...\n');
var watcher = Chokidar.watch('src', {persistent: true});

// hack to stop an initial onslaught of compiles
setTimeout(() => {
  watcher
    .on('add', onAdd)
    .on('change', onChange)
    .on('unlink', onUnlink)
    .on('error', onError);

  writeStdout('Ready to watch!\nPerforming initial compile...\n');
  babelRecompileAndChmod();
}, 500);
	
function onAdd() {
  babelRecompileAndChmod();
}

function onChange() {
  babelRecompileAndChmod();
}


function onUnlink() {
  babelRecompileAndChmod();
}

function onError(error) {
  console.error('Error happened', error);
}

function babelRecompileAndChmod() {
  const babel = spawn('./node_modules/.bin/babel', [
    'src',
    '--out-dir',
    'target'
  ]);
	
  babel.stdout.on('data', function (data) {
    writeStdout(data);
  });
	
  babel.stderr.on('data', function (data) {
    writeStdout(data);
  });
	
  babel.on('exit', function (data) {
    if (data) writeStdout('Exit data: ' + data + '\n');
    fs.chmod('target/index.js', 0o711, err => {
      if (err) console.log(err);
    });
  });
}
