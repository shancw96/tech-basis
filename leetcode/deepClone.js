//递归
function deepClone(source){
  if(typeof source !== "object"){
      return source
  }
  
  //当前的Value的类型
  let cloneObj = source instanceof Array ? []:{};
  
  Object.keys(source).forEach(key=>{
      cloneObj[key] = deepClone(source[key])
  })
  return cloneObj
}

let obj = {
  a:{
    b:1
  },
  c:[
    1,2
  ]
}
console.log(deepClone(obj))