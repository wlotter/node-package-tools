import Path from 'path';

import {rename, symlink} from '../promise-fs';
import Config from '../../configuration/io';

export default class FileSystemDeployer {

  static deploy(fileName) {
    const destinationConfig = Config.read('repo.push.dest');
    const destinationRoot = Path.resolve(destinationConfig);
    const destination = Path.join(destinationRoot, fileName);
    
    return rename(fileName, destination)
      .then(() => {
        const latestLink = Config.read('repo.push.latest')
        if (!latestLink) return;

        return symlink(destination, Path.join(destinationRoot, latestLink));
      });
  }

}