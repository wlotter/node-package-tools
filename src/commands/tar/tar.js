import Tar from 'tar';
import FS from 'fs';
import Util from 'util';
import Path from 'path';

import Config from '../../configuration/io';
import Logger from '../../logger';

import * as PromiseAll from '../../utilities/promise-all';

const TAR_REGEX = /^.*\.(tgz|tar\.gz)$/;

export default function tar(argv) {
  const {name, src} = argv;
  const tarName = name ? name : resolveTarName();
  const tarSrc = src ? src : Config.read('tar.src');

  if (!tarSrc || tarSrc.length < 1) {
    Logger.error('No source files or directories provided');
    return;
  }

  if (!TAR_REGEX.test(tarName)) {
    Logger.warn(tarName + ' does not have an appropriate file extension!');
  }

  PromiseAll.all(tarSrc.map(src => access(src)))
    .catch(err => {
      const {errors} = err;
      Logger.error('Could not access paths: ' + errors.map(error => error.result.path));
      return Promise.reject();
    })
    .then(() => Tar.create({
      gzip: true,
      file: tarName
    }, tarSrc))
    .then(() => {
      Logger.result('Created ' + tarName);
    })
    .catch(() => {
      Logger.error('Error creating tar - exiting code 1');
      process.exit(1);
    })
    .then(() => {
      if (!argv.deploy) return Promise.resolve();

      // only file paths supported as repos atm
      const pushRepo = Config.read('repo.push');
      if (!pushRepo) throw new Error('no push repo set!');

      const pushPath = Path.resolve(pushRepo);
      return rename(tarName, pushPath + '/' + tarName);
    });
}

function resolveTarName() {
  const configuredTarName = Config.read('tar.name');
  if (configuredTarName) return configuredTarName;

  Logger.debug('No configured tar.name - resolving from package info...');

  const packageInfo = Config.getPackageInfo();
  return packageInfo.name + '-' + packageInfo.version + '.tgz';
}

const access = Util.promisify(FS.access);
const rename = Util.promisify(FS.rename);