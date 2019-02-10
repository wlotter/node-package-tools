import FS from 'fs';
import Util from 'util';

const access = Util.promisify(FS.access);
const rename = Util.promisify(FS.rename);
const symlink = Util.promisify(FS.symlink);

export {access, rename, symlink};