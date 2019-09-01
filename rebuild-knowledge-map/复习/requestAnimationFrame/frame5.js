function _setInterval(fn,time,...args){
  const count = {timer:0}
  let prev = Date.now()
  let loop = ()=>{
    count.timer = requestAnimationFrame(loop)
    //somecode
    let cur = Date.now()
    if(cur-prev > time){
      prev = Date.now()
      fn(args)
    }
  }
  count.timer = requestAnimationFrame(loop)
  return count
}

let count = _setInterval(()=>{
  console.log('triggle')
},1000)
