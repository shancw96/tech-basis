function curry(fn) {
  let tempArgs = []
  return function curried(...args) {
    tempArgs = [...tempArgs, ...args]
    return tempArgs.length === fn.length ? fn.apply(null, tempArgs) : curried
  }
}
const curriedSum3 = (arg1, arg2, arg3) => console.log(arg1 + arg2 + arg3)
const curried = curry(curriedSum3)

const temp = curried(1,2)
temp(3)