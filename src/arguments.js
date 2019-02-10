class Arguments {

  set(args) {
    this.args = args;
    Object.freeze(this);
  }

  get() {
    if (!this.args) throw new Error('Arguments not set on argument bucket');
    return this.args;
  }

}

export default new Arguments();