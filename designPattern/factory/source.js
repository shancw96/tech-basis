class Product {
  constructor(name){
    this.name = name
  }
  fn1(){

  }

  fn2(){

  }

  fn3(){

  }
}

class Factory{
  create(name){
    return new Product(na,e)
  }
}

let creator = new Factory(name)
let product = creator.create('name1')

//jQuery

class JQuery {
  constructor(selector){
    //
  }

  append(){

  }

  addClass(){

  }

  html(){

  }
}


class FactoryJ{
  $(name){
    return new JQuery(name)
  }
}

window.$ = new Factory()
let method = $('section').append()

