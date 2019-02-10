import Path from 'path';

import {access, rename, symlink, mkdir, unlink} from '../promise-fs';
import PromiseChain from '../dynamic-promise-chain';

import Config from '../../configuration/io';

export default class FileSystemDeployer {

  static deploy(fileName) {
    const respositoryConfig = Config.read('repo.push.dest');
    const repository = Path.resolve(respositoryConfig);

    const packageName = Config.getPackageInfo().name;
    const packageRepo = Path.join(repository, packageName);
    const fullPath = Path.join(packageRepo, fileName);

    const linkName = Config.getPackageInfo().name;

    const copyToRepo = () => {
      return access(repository)
      .catch(() => {
        throw new Error('Could not access repository!');
      })
      .then(() => access(packageRepo))
      .catch(() => mkdir(packageRepo))
      .then(() => rename(fileName, fullPath))
    }

    const promises = [copyToRepo];

    if (linkName) {
      const linkPath = Path.join(packageRepo, linkName);
      const linkLatest = () => {
        return access(linkPath)
          .then(() => unlink(linkPath))
          .catch(() => Promise.resolve())
          .then(() => symlink(fullPath, linkPath + '.tgz'));
      }

      promises.push(linkLatest);
    }

    const promiseChain = new PromiseChain(promises);

    return promiseChain.execute();
  }

}