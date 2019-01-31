import Chalk from 'chalk';

let instance = null;

const LEVEL = {
	ERROR: 0,
	WARN: 1,
	INFO: 2,
	DEBUG: 3,
	TRACE: 4
};

const ERROR_PREFIX = Chalk.bgRed.black('ERR:') + ' ';
const ERROR_STYLE = Chalk.redBright;

const WARN_PREFIX = Chalk.bgYellow.black('WARN:') + ' ';
const WARN_STYLE = Chalk.keyword('orange');

class Logger {

	constructor() {
		this.level = LEVEL.WARN;
	}

	setLevel(level) {
		this.level = level;
	}

	error(message) {
		console.log(ERROR_PREFIX + ERROR_STYLE(message));
	}

	warn(message) {
		if (this.level < LEVEL.WARN) return;
		console.log(WARN_PREFIX + WARN_STYLE(message));
	}

	info(message) {
		if (this.level < LEVEL.INFO) return;
		console.log(message);
	}

	debug(message) {
		if (this.level < LEVEL.DEBUG) return;
		console.log(message);
	}

	trace(message) {
		if (this.level < LEVEL.TRACE) return;
		console.log(message);
	}

	result(message) {
		console.log(Chalk.blue(message));
	}

}

export default function getInstance() {
	return instance ? instance : new Logger();
}
