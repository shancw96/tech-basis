// Promise.all 只有全部都完成的时候才会resolve，只要有一个报错，那么执行reject
function promise_all_polyfill(promiseArr) {
  let final = []
  let finishCount = 0 // 正确执行的个数
  let isError = false // 是否报错
  for(let index in promiseArr) {
    if(!isError && finishCount < promiseArr.length) {
      promiseArr[index]
        .then(res => {
          final[index] = res;
          finishCount += 1
        }).catch(e => {
          final = Promise.reject(e)
          isError = true
        })
    }
  }
  // 使用 return new Promise((resolve, reject)) 可以简化操作
  return final instanceof Promise ? final : Promise.resolve(final)
}

function promise_all_polyfill() {
  return new Promise((resolve, reject) => {
    let final = [];
    let finishCount = 0 // 正确执行的个数
    for(let index in promiseArr) {
      promiseArr[index]
        .then(res => {
          final[index] = res;
          finishCount += 1
          if(finishCount === promiseArr.length) {
            resolve(final)
          }
        }).catch(e => reject(e))
      }
  })
}
Promise._race = promises => new Promise((resolve, reject) => {
	promises.forEach(promise => {
		promise.then(resolve, reject)
	})
})
