let myCount = {
  timer : null,
  _setInterval(fn,ms){
    prev = Date.now();
    let loop = () => {
      this.timer = requestAnimationFrame(loop)
      let cur = Date.now()
      if(cur-prev>=ms){
        prev = Date.now();
        fn()
      }
    }
    this.timer = requestAnimationFrame(loop)
  },
  cancelInterval(){
    cancelAnimationFrame(this.timer)
  }

}
myCount._setInterval(()=>{
  console.log('hello ')
},1000)




