import Tar from 'tar';
import {access} from '../../utilities/promise-fs';

import Config from '../../configuration/io';
import DEPLOYMENT_METHODS from '../../utilities/deployers/index';
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

      const deployType = Config.read('repo.push.type');
      const deployer = DEPLOYMENT_METHODS[deployType];

      if (!deployer) throw new Error('undefined deployer!');
      return deployer.deploy(tarName);
    });
}

function resolveTarName() {
  const configuredTarName = Config.read('tar.name');
  if (configuredTarName) return configuredTarName;

  Logger.debug('No configured tar.name - resolving from package info...');

  const packageInfo = Config.getPackageInfo();
  return packageInfo.name + '-' + packageInfo.version + '.tgz';
}
