// module.exports = function debounce(fn,delay){
  function debounce(fn,delay=1000)
  let timer = null;
  return ()=>{
    clearTimeout(timer)
    timer = setTImeout(()=>{
      fn
    },delay)
  }
// }