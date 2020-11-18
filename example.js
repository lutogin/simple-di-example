const { Container } = require('./container');

class FooRepository {
  list() {
    return ['A', 'B', 'C'];
  }
}

class FooController {
  constructor({ fooRepository }) {
    this.fooRepository = fooRepository;
  }

  showList() {
    return this.fooRepository.list();
  }
}

class FooServiceProvider {
  register(container) {
    container.set('fooRepository', () => new FooRepository());
    container.set('fooController', () => new FooController({
      fooRepository: container.get('fooRepository'),
    }));
  }
}

const container = new Container();
container.register(new FooServiceProvider());

const fooController = container.get('fooController');
console.log(fooController.showList()); // ['A', 'B', 'C']
