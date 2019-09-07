function debounce(fn,delay){
  let timer = null;
  return ()=>{
    clearTimeout(timer)
    timer = setTimeout(()=>{
      fn()
    },delay)
  }
}
function throttle(fn,delay){
  let prev = Date.now()
  return ()=>{
    if(Date.now() - prev > delay ){
      prev = Date.now()
      fn()
    }
  }
}
window.addEventListener('scroll',throttle(()=>console.log('tirggle'),100))