{
  {//拦截继承
    var proxy = new Proxy({}, {
      get(target,property){
        console.log('I can do something here in prototype')
        return Reflect.get(target,property)
      }
    })
    let obj = Object.create(proxy)
    obj.fun  //
  } 
  {//数组读取负数的索引。
    function createArr(...args){
      let handler = {
        get(target,prop){
          let index = Number(prop)
          if(index<0){
            prop = String(target.length + index)
          }
          return Reflect.get(target,prop)
        }
      }
      let target = args.map(val=>val)
      return new Proxy(target,handler)
    }
    let arr = createArr(1,2,3,4,5)
    console.log(arr[-2])
  }
}
