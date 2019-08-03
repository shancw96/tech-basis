递归
function deepClone(sourceObj){
  if(typeof sourceObj !== 'object'){
    return sourceObj
  }

  let cloneObj = sourceObj instanceof Array ? [] : {}

  Object.keys(sourceObj).forEach(key=>{
    cloneObj[key] = deepClone(sourceObj[key]);//最外层的cloneObj一直存在cloneObj = deepClone(deepClone(deepClone))  return return return 
  })
  return cloneObj
}

console.log(deepCloneDepth({a:{b:1}}))