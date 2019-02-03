#!/usr/bin/env node

// Dev script - I had permission issues when using babels watch option

const Chokidar = require('chokidar');
const spawn = require('child_process').spawn;
const fs = require('fs');

var watcher = Chokidar.watch('src', {persistent: true});

// hack to stop an initial onslaught of compiles
setTimeout(() => {
	watcher
		.on('add', onAdd)
		.on('change', onChange)
		.on('unlink', onUnlink)
		.on('error', onError)
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
	console.error('Error happened', error)
}

function babelRecompileAndChmod() {
	const babel = spawn('./node_modules/.bin/babel', [
		'src',
		'--out-dir',
		'target'
	]);
	
	babel.stdout.on('data', function (data) {
		process.stdout.write(data);
	});
	
	babel.stderr.on('data', function (data) {
		process.stdout.write(data);
	});
	
	babel.on('exit', function (data) {
		if (data) process.stdout.write('Exit data: ' + data + '\n');
		fs.chmod('target/index.js', 0o711, err => {
			if (err) console.log(err);
		});
	});
}

