let obj = {
  value : 1
}

// let test = ()=>console.log(this.value)
function test(arg1,arg2){
  console.log(this)
  // console.log(this.value)
}
let gb = test()
// console.log('-------drive----------')
test.apply(obj) //绑定this，并且执行
// console.log('-------drive----------')
test.bind(obj)() //返回绑定了this值的函数

//test.apply(obj,array) =={ let bd = test.bind(obj); bd(arg1,arg2)}
//test.apply(obj,array) ==test.bind(obj)(arg1,arg2)

