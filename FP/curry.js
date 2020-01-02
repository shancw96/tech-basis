const currying = (fn, ...args) => {
  if (args.length >= fn.length) {
    //传入的args 比 fn的形参多，则直接调用
    return fn(...args);
  }
  return (...args2) => currying(fn, ...args, ...args2); //返回一个新的函数，接收新的参数，将旧的与新的整合
};

const part1 = currying((x, y, z) => x + y + z, 1);
const part2 = part1(2, 3);
console.log(part2);

function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args); //收集args
    }

    return fn.call(null, ...args);
  };
}

let fn = curry((x, y, z, k) => x + y + z + k);
const incr1 = fn(1, 2);
const incr2 = incr1(2);
console.log(incr1(1));
