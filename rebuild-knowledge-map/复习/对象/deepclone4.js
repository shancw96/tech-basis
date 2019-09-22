function deepclone_cycle(obj,memorize = new WeakMap()){
    if(typeof obj !== 'object') return obj
    if(memorize.has(obj)) return memorize.get(obj)
    let cloneObj = obj instanceof Array ? [] : {}
    memorize.set(obj,cloneObj)
    Object.keys(obj).forEach(key=>{
        cloneObj[key] = deepclone_cycle(obj[key],memorize)
        
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
  
  let ans = deepclone_cycle(obj)
  console.log(ans)