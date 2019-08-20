let ori_obj = {
  al:1,
  b:2
}

let myProxy = new Proxy(ori_obj,{
  get(target,property,receiver){//receiver : Proxy或者继承Proxy的对象
    console.log(`catch get name:${property}`)//这里不能打印receiver，会将receiver通过Symbol.toPrimitive方法进行转换
    return Reflect.get(target,property,receiver)
  },

  set(target,property,value,receiver){
    console.log(`listen set ${property}:${value}`)
    return Reflect.set(target,property,value)
  }
})

myProxy.al//读取值
myProxy.b = 3