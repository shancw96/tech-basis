const RAF = {
  intervalTimer: null,
  timeoutTimer: null,
  setTimeout (cb, interval) { // 实现setTimeout功能
    let stime = Date.now()
    let loop = () => {
       this.timeoutTimer = requestAnimationFrame(loop)
      let etime = Date.now()
      if (etime - stime >= interval) {
        cb()//回调函数
        cancelAnimationFrame(this.timeoutTimer)
      }
    }
    this.timeoutTimer = requestAnimationFrame(loop)
    return this.timeoutTimer
  },
  clearTimeout () {
    cancelAnimationFrame(this.timeoutTimer)
  },
  setInterval (cb, interval) { // 实现setInterval功能
    let now = Date.now
    let stime = now()
    let etime = stime
    let loop = () => {
      this.intervalTimer = requestAnimationFrame(loop)
      etime = now()
      if (etime - stime >= interval) {
        stime = now()
        etime = stime
        cb()
      }
    }
    this.intervalTimer = requestAnimationFrame(loop)
    return this.intervalTimer
  },
  clearInterval () {
    cancelAnimationFrame(this.intervalTimer)
  }
}

// function _setTimeout(fn,delay){
//   let prev = Date.now()
//   let timer = null
//   let loop = ()=>{
//     timer  = requestAnimationFrame(loop);//回调函数执行次数通常与浏览器屏幕刷新次数相匹配60fps，一秒钟60次
//     let now = Date.now();
//     if(now-prev >= delay){
//       fn()
//       cancelAnimationFrame(timer)
//     }
//   }
//   timer = requestAnimationFrame(loop)
//   return timer
// }

// // let timoutTimer = _setTimeout(()=>{
// //   console.log('triggle')
// // },1*1000)

// function _setInterval(fn,interval){
//   let prev = Date.now();
//   let timer = null;
//   let loop = ()=>{
//     timer = requestAnimationFrame(loop)//每帧执行一次,每帧执行一次判断，帧数越高，越准确
//     let cur = Date.now();
//     if(cur - prev >= interval){
//       prev = Date.now();
//       fn();
//     }
//   }
//   timer = requestAnimationFrame(loop)
//   return timer
// }

// let intervalTimer = _setInterval(()=>{
//   console.log('setInterval:  triggle once')
// },.5)
