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

  if (!tarSrc || tarSrc.length < 1) {
    Logger.error('No source files or directories provided');
    return;
  }

  if (!TAR_REGEX.test(tarName)) {
    Logger.warn(tarName + ' does not have an appropriate file extension!');
  }

  Promise.all(tarSrc.map(src => 
  {
    return access(src)
      .then(() => {
        return {
          type: 'success'
        };
      })
      .catch(err => {
        Logger.debug(err);
        Logger.error('Source ' + src + ' could not be accessed.');
        return {
          type: 'error',
          src: src
        };
      });
  }))
    .then((results)=> {
      const error = results.find(result => result.type === 'error');
      if (error) return Promise.reject();

      Tar.create({
        gzip: true,
        file: tarName,
        sync: true
      }, tarSrc);
      
      Logger.result('Created ' + tarName);
    })
    .catch(() => {
      Logger.error('One or more of the sources could not be accessed');
      process.exit(1);
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