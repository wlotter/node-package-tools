
const SUCCESS = 'success';
const ERROR = 'error';

/**
 * 
 * @param {array} promises an array of promises
 * @returns a promise resolving as an array of the results of the input promise,
 *  or rejecting with {successes, errors}
 */
export function all(promises) {
  return Promise.all(promises.map(promise => {
    return promise
      .then(result => {
        return {
          type: SUCCESS,
          result
        };
      })
      .catch(err => {
        return {
          type: ERROR,
          result: err
        };
      })
  }))
  .then(results => {
    const successes = results.filter(result => result.type === SUCCESS);
    const errors = results.filter(result => result.type === ERROR)
    if (errors.length > 0) return Promise.reject({successes, errors});
    return Promise.resolve(successes.map(success => success.result));
  })
}