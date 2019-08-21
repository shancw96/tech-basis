function _setTimeout(callback,time_s){
  let timer = null;
  let prev = Date.now()
  let loop = () => {
    timer = requestAnimationFrame(loop)
    let cur = Date.now();
    if(cur-prev > time_s*1000){
      callback();
      cancelAnimationFrame(timer)
    }
  }
  timer = requestAnimationFrame(loop)
}

function _setInterval(callback,time_s){
  let arr = []
  let time = null ;
  let prev = Date.now();
  let loop = ()=>{
    // console.log(requestAnimationFrame(loop))
    time = requestAnimationFrame(loop)
    arr.push(time)
    let cur = Date.now();
    if(cur-prev > time_s*1000){
      prev = Date.now()
      callback();
      
    }
  }
  requestAnimationFrame(loop)
}

// console.log(timer)


