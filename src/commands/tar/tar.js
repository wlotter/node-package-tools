import Tar from 'tar';
import FS from 'fs';
import Util from 'util';

import Config from '../../configuration/io';
import Logger from '../../logger';

const TAR_REGEX = /^.*\.(tgz|tar\.gz)$/;

export default function tar(argv) {
  const {name, src} = argv;
  const tarName = name ? name : resolveTarName();
  const tarSrc = src ? src : Config.read('tar.src');

  if (!TAR_REGEX.test(tarName)) {
    Logger.warn(tarName + ' does not have an appropriate file extension!');
  }

  if (!tarSrc || tarSrc.length < 1) {
    Logger.error('No source files or directories provided');
    return;
  }

  Promise.all(tarSrc.map(src => access(src)))
    .then(()=> {
      Tar.create({
        gzip: true,
        file: tarName,
        sync: true
      }, tarSrc);
      Logger.result('Created ' + tarName);
    })
    .catch(err => {
      Logger.debug(err);
      Logger.error('One or more of the sources did not exist: ' + tarSrc);
    })
}

function resolveTarName() {
  const configuredTarName = Config.read('tar.name');
  if (configuredTarName) return configuredTarName;

  Logger.debug('No configured tar.name - resolving from package info...');

  const packageInfo = Config.getPackageInfo();
  return packageInfo.name + '-' + packageInfo.version + '.tgz';
}

const access = Util.promisify(FS.access);