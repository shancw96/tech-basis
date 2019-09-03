function deepclone(obj,dictionary = new WeakMap()){//去除环

  if(typeof obj !== 'object') return obj
  if(dictionary.has(obj)) return dictionary.get(obj)
  let cloneObj = obj instanceof Array ? [] : {}
  dictionary.set(obj,cloneObj)
  Object.keys(obj).forEach(key=>{
    cloneObj[key] = deepclone(obj[key],dictionary)
  })
  return cloneObj
}

let obj = {
  a:1,
  b:{
    a:2,
    c:3
  }
}
obj.a = obj

let ans = deepclone(obj)
