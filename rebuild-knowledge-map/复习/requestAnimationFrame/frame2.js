function _setTimeout(fn,ms){
  let timer = null;
  let prev = Date.now();
  let loop = ()=>{
    timer = requestAnimationFrame(loop)
    //someCode
    let cur = Date.now()
    if(cur-prev > ms){
      fn()
      cancelAnimationFrame(timer)
    }
  }
  timer = requestAnimationFrame(loop)
  return timer
}