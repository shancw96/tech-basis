var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}


function flatObj(source,parentKey="",result={}){
  Object.keys(source).forEach(key=>{
    let keyName = parentKey + '.' + key;
    if(typeof source[key] === 'object'){
      flatObj(source[key],keyName,result)
    }else{
      result[keyName] = source[key]
    }
  })
  return result
}

console.log(flatObj(entry))

