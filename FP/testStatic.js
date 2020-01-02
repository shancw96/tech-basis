class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}

console.log(Container.of(3));

let example = new Container(4);
console.log(example.of);
