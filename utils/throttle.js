function throttle(fn, delay) {
  let timer = null;
  return function() {
    clearInterval(timer)
    timer = setInterval(() => {
      fn.apply(this, arguments)
      clearInterval(timer)
    }, delay)
  }
}

function debounce(fn, delay) {
  let timer = Date.now();
  return function(...args) {
    const curTime = Daate.now()
    if(curTime >= timer + delay) {
      fn.apply(this, args)
    }
  }
}

// 帧同步 拖拽动画
function rafThrottle(fn: any) {
  let locked = false;
  return function(...args: any) {
    if (locked) return;
    locked = true;
    // 在当前帧进行执行，当前帧执行完毕前，都不会在触发拖拽
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}


const throttleFn = throttle((log) => {
  console.log(log)
}, 1000)

throttleFn(1)
throttleFn(2)
throttleFn(3)
throttleFn(4)