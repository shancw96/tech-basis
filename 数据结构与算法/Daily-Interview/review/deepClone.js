function deepCloneV1(obj){
  if(typeof obj !== 'object') return obj
  let curDepthObj = obj instanceof Array ? [] : {}
  Object.keys(obj).forEach(key=>{
    curDepthObj[key] = deepCloneV1(obj[key])
  })
  return curDepthObj

}
//curDepthObj = deepClone(obj[key]) 
//                  curDepthObj[key] = deepClone(obj[key])
                      //                   urDepthObj[key] = value   obj !== 'object'（key：value不是对象）
let obj1 = {
  a:1,
  b:{
    a1:1,
    b1:[{a:1}],
  }
}
let cloned = deepCloneV1(obj1)
// console.log(cloned)
let objCycle = {
  a:1,
  b:{
    cycle:'objCycle.a'
  }
}
objCycle.b.cycle = objCycle.a
//使用weakMap的原因：weakMap是弱引用，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存
function deepCloneCycle(obj,hash=new WeakMap()){
  if(typeof obj !== 'object') return obj

  if(hash.get(obj)) return hash.get(obj)//如果遇到成环的则返回已经存储的

  let curDepthObj = obj instanceof Array ? [] : {}
  hash.set(obj,curDepthObj)//存储obj
  Object.keys(obj).forEach(key=>{
    curDepthObj[key] = deepCloneCycle(obj[key])
  })
  return curDepthObj
}
let cycleObj = deepCloneCycle(objCycle)
console.log(cycleObj)