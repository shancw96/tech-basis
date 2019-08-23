function _setInterval(fn,ms){
  let timer = null;
  let prev = Date.now()
  let loop = ()=>{
    timer = requestAnimationFrame(loop)
    //code
    let cur = Date.now()
    if(cur-prev >= ms){
      prev = Date.now();
      fn()
    }
  }
  timer = requestAnimationFrame(loop)
  return timer
}
let counter = _setInterval(()=>{
  console.log('do something here')
},1000)
