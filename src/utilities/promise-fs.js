import FS from 'fs';
import Util from 'util';

const access = Util.promisify(FS.access);
const rename = Util.promisify(FS.rename);
const symlink = Util.promisify(FS.symlink);
const mkdir = Util.promisify(FS.mkdir);
const unlink = Util.promisify(FS.unlink);

export {access, rename, symlink, mkdir, unlink};