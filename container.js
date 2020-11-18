const isSymbol = input => typeof input === 'symbol';

class Container {
  constructor() {
    this.definions = new Map();
    this.instances = new Map();
    this.factories = new Map();
  }

  set(member, definion) {
    this.definions.set(member, definion);
  }

  register(serviceProvider) {
    if (serviceProvider && serviceProvider.register instanceof Function) {
      serviceProvider.register(this);
      return;
    }

    if (serviceProvider instanceof Function) {
      serviceProvider(this);
      return;
    }

    throw new Error('Unsupported service provider');
  }

  get(member) {
    if (this.instances.has(member)) {
      return this.instances.get(member);
    }

    if (this.factories.has(member)) {
      const factory = this.factories.get(member);
      return factory(this.proxy);
    }

    if (this.definions.has(member)) {
      const definion = this.definions.get(member);

      if (definion instanceof Function) {
        const instance = definion(this.proxy);
        this.instances.set(member, instance);
        return instance;
      }

      return definion;
    }

    throw new Error('Unknown member');
  }
}

module.exports = {
  Container,
};
