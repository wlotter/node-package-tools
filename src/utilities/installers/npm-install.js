const exec = require('child_process').exec;
import Util from 'util';

const execp = Util.promisify(exec);

export default class NpmInstall {
  
  static execute(packageName) {
    return execp('npm install', [packageName]);
  }

}
