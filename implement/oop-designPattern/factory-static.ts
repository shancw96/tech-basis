// define Pizza kinds
abstract class Pizza {
  abstract name:string
  prepare() {
    console.log('pizza prepare: ', this.name)
  }
  bake() {
    console.log('pizza bake: ', this.name)
  }
  cut() {
    console.log('pizza cut: ', this.name)
  }
  box() {
    console.log('pizza box: ', this.name)
  }
}
enum PizzaKinds {
  CheesePizza = 'CheesePizza',
  VeggiePizza = 'VeggiePizza',
  ClamPizza = 'ClamPizza',
  PepperoniPizza = 'PepperoniPizza'
}
class CheesePizza extends Pizza {
  name: string
  constructor() {
    super()
    this.name = PizzaKinds.CheesePizza
  }
}
class VeggiePizza extends Pizza {
  name: string
  constructor() {
    super()
    this.name = PizzaKinds.VeggiePizza
  }
}
class ClamPizza extends Pizza {
  name: string
  constructor() {
    super()
    this.name = PizzaKinds.ClamPizza
  }
}
class PepperoniPizza extends Pizza {
  name: string
  constructor() {
    super()
    this.name = PizzaKinds.PepperoniPizza
  }
}

// define Factory
class SimplePizzaFactory {
  static createPizza(type: string) {
    return type === PizzaKinds.CheesePizza
      ? new CheesePizza()
      : type === PizzaKinds.VeggiePizza
      ? new VeggiePizza()
      : type === PizzaKinds.PepperoniPizza
      ? new PepperoniPizza()
      : type === PizzaKinds.ClamPizza
      ? new ClamPizza()
      : null
  }
}

// client use
class PizzaStore {
  orderPizza(kind: PizzaKinds) {
    const pizza = SimplePizzaFactory.createPizza(kind)
    pizza?.prepare()
    pizza?.bake()
    pizza?.cut()
    pizza?.box()
  }
}

const littleStore = new PizzaStore()
littleStore.orderPizza(PizzaKinds.CheesePizza)
