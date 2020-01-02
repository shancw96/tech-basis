const R = require("ramda");
// class Maybe {
//   static of(x) {
//     return new Maybe(x);
//   }

//   constructor(x) {
//     this.$value = x;
//   }

//   //isNothing :: ()-> Boolean
//   get isNothing() {
//     return (this.$value === null) | (this.$value === undefined);
//   }
//   //map ::(a->b)-> Constructor | instance Maybe
//   map(fn) {
//     return this.isNothing ? this : Maybe.of(fn(this.$value));
//   }
//   //inspect ::()-> String
//   inspect() {
//     return this.isNothing ? "Nothing" : `Just(${this.$value})`;
//   }
// }

// console.log(Maybe.of("Malkovich Malkovich").map(R.match(/a/gi)));

const isNotPrime = item => item.type !== "prime";

const filterCart = R.curry((fn, cart) => cart.filter(fn));

const cutDownPercent = R.curry((per, item) => {
  return { ...item, price: item.price * per };
});

function applyCoupon(cart) {
  //  先过滤cart，去除Prime 这个种类，降价为80%
  // return R.compose(R.map(cutDownPercent(0.8)), filterCart(isNotPrime))(cart);
  cart.filter(isNotPrime).map(cutDownPercent(0.8));
}

const cart = [
  { name: "Biscuits", type: "regular", category: "food", price: 2.0 },
  { name: "Monitor", type: "prime", category: "tech", price: 119.99 },
  { name: "Mouse", type: "prime", category: "tech", price: 25.5 },
  { name: "dress", type: "regular", category: "clothes", price: 49.9 }
];

console.log(applyCoupon(cart));
