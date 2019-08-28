function _interval(fn,timeout){
  let timer = {test:''};//使用引用类型，解决异步函数无法正确赋值，基本类型，传递的永远是旧的，新的覆盖旧的。而引用类型，传递的是指针地址，没有所谓的覆盖一说，只存在更新
  let prev = Date.now()
  let loop = ()=>{
    timer.test = requestAnimationFrame(loop)
    let cur = Date.now()
    if(cur-prev > timeout){
      fn()
      prev = Date.now()
    }
  }
  timer.test = requestAnimationFrame(loop)//异步函数，callback==loop 等同步执行完毕后执行异步
  return timer
}
let timer = _interval(()=>{
  console.log('triggle')
},1000)
console.log(timer)