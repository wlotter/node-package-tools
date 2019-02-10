import INSTALL_METHODS from '../../utilities/installers/index'
import Config from '../../configuration/io'

export default function install(argv) {
  const packageName = argv.package;
  
  if (!packageName) throw new Error('Require a package name argument!');

  const installType = Config.read('repo.pull.type');
  const installer = INSTALL_METHODS[installType];

  installer.install(packageName)
    .catch(err => console.log(err));
}
