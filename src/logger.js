/* eslint-disable no-console */
import Chalk from 'chalk';

const LEVEL = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

const ERROR_PREFIX = Chalk.bold.bgRedBright.black('ERR:') + ' ';
const ERROR_STYLE = Chalk.redBright;

const WARN_PREFIX = Chalk.bold.bgKeyword('orange').black('WARN:') + ' ';
const WARN_STYLE = Chalk.keyword('orange');

const DEBUG_PREFIX = Chalk.bgBlue.black('DEBUG:') + ' ';
const DEBUG_STYLE = Chalk.blue;

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
    console.log(DEBUG_PREFIX + DEBUG_STYLE(message));
  }

  trace(message) {
    if (this.level < LEVEL.TRACE) return;
    console.log(message);
  }

  result(message) {
    console.log(Chalk.blue.bold(message));
  }

}

export default new Logger();

export {LEVEL};
