function wait(ms){
  return new Promise((resoved,rejece)=>{
    //async function
    setTimeout(resoved,ms,'done')//resolved time resolved的参数
    //resolved 的作用：将pending状态改为resolved状态，并且调用回调函数this.rejectedCallbacks
  })
}

console.log(wait(100))
wait(100).then(res=>console.log(res))//expect:done