import Path from 'path';

import Logger from '../../logger';
import Config from '../../configuration/io';

import NpmInstall from './npm-install';

export default class FileSystemInstaller {

  static install(packageName, version) {
    const respositoryConfig = Config.read('repo.pull.src');
    const repository = Path.resolve(respositoryConfig);

    const packageRepo = Path.join(repository, packageName);
    const fullPath = Path.join(packageRepo, packageName);

    Logger.debug(fullPath);

    return NpmInstall.execute(fullPath);
  }

}