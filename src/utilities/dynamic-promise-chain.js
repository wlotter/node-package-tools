export default class PromiseChain {

  constructor(promises) {
    this.promises = promises ? promises : [];
  }

  push(promise) {
    this.promises.push(promise);
  }

  execute() {
    return this.promises.reduce((chain, promise) => chain.then(promise), Promise.resolve());
  }

}
