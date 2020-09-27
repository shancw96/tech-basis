function wait(ms){
  return new Promise((resolved,rejece)=>{
    //async function
    setTimeout(()=>{
      resolved('done')
    },ms)//resolved time resolved的参数
    //resolved 的作用：将pending状态改为resolved状态，并且调用回调函数this.rejectedCallbacks
  })
}

let result = wait(100)//返回Promise 构造函数本身
let test = wait(100).then('asd')


console.log(result)
console.log(test)
// wait(100).then(res=>console.log(res))//expect:done-