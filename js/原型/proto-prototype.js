function Foo(name) {
  this.name = name
}

console.log(Foo.prototype.constructor, Foo.constructor, Foo.prototype === Foo.constructor)
