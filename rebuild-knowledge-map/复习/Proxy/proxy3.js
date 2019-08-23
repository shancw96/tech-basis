{
  {//监听/拦截继承
    var proto = new Proxy({},{
      get(target,prop){
        console.log(`l am do something in __proto__${JSON.stringify(this)}`)
        return Reflect.get(target,prop)
      }
    })
    let new_Obj = Object.create(proto)
    new_Obj.__proto__.fun = '111'
  } 
  {//数组读取负数的索引。
    function createArr(...args){
      let handler = {
        get(target,prop){
          prop = Number(prop)<0 ? String(target.length + Number(prop)) : prop
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
