function asyncAwait_polyfill(genFn) {
  return new Promise((resolve, reject) => {
    const iterator = genFn()
    run()
    function run(value) {
      const tempResult = iterator.next(value)
      if(tempResult.done) {
        resolve(tempResult.value)
      } else {
        tempResult.value.then(res => {
          run(res)
        })
      }
    }
  })
}

const promise100Start = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
const promise100 = val => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(val + 1)
  }, 1000)
})


asyncAwait_polyfill(
  function* gen() {
    const temp1 = yield promise100Start()
    console.log('yield promise100Start', temp1)
    const temp2 = yield promise100(temp1)
    console.log('yield promise100', temp2)
    return temp2
  }
).then(res => {
  console.log('asyncAwait_polyfill', res)
})

