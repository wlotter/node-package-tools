import specification from './specification';

import Logger from '../logger';

export default function validate(key, value) {
  const keySpec = getSpecification(key);
  Logger.debug('validating against: \n' + JSON.stringify(keySpec, null, '\t'));
  return keySpec && typeValidators[keySpec.type](value);
}

export function getSpecification(key) {
  const splitKey = key.split('.');
  let keySpec = null;
  try {
    keySpec = splitKey.reduce((spec, key) => {
      const options = spec.options ? spec.options : spec;
      const nestedSpec = options.find(element => element.name === key);
      if (!nestedSpec) {
        Logger.error('couldn\'t find specification for this config key');
        throw new Error();
      }
      return nestedSpec;
    }, specification);
  } catch (err) {
    Logger.error('Problem validating config option');
  }
  return keySpec;
}

const typeValidators = {
  string: (value) => {
    return value.length < 2;
  },
  array: () => {
    return true;
  },
  object: () => {
    Logger.error('can\'t set an object config options value through CLI');
    return false;
  }
};