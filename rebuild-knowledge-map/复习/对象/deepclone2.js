function deepClone(obj,dictionary = new WeakMap()){

  if(typeof obj !== 'object') return obj
  if(dictionary.has(obj)) return dictionary.get(obj)
  let cloneObj = obj instanceof Array ? [] : {}
  dictionary.set(obj,cloneObj)
  Object.keys(obj).forEach(key=>{
    cloneObj[key] = deepClone(obj[key],dictionary)
  })
  return cloneObj
}
let obj = {
  a:1,
  b:2,
  c:{
    a:1
  }
}
obj.c.a = c
let res = deepClone(obj)
console.log(res)