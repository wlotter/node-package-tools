import Logger, {LEVEL} from '../logger';
import Arguments from '../arguments';

import configCommand from './config/config';
import tarCommand from './tar/tar';
import installCommand from './install/install';

function preCommand(argv) {
  Object.freeze(argv);
  Arguments.set(argv);

  if (argv.verbose) Logger.setLevel(LEVEL.INFO);
  if (argv.logger) Logger.setLevel(LEVEL[argv.logger]);
}

function commandify(command) {
  return (argv) => {
    preCommand(argv);
    command(argv);
  };
}

const config = commandify(configCommand);
const tar = commandify(tarCommand);
const install = commandify(installCommand);

export {
  config,
  tar,
  install
};
